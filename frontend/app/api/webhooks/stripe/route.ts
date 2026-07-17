import { NextRequest, NextResponse } from "next/server";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Payment Links use a public URL slug that differs from Stripe's internal
// object id, so we resolve the tier by fetching the link and comparing its
// URL to the two known links, rather than matching ids directly.
async function resolveTier(paymentLinkId: string | null): Promise<string> {
  if (!paymentLinkId || !stripe) return "unknown";
  const standard = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_STANDARD;
  const premium = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM;
  const link = await stripe.paymentLinks.retrieve(paymentLinkId);
  if (standard && link.url === standard) return "standard";
  if (premium && link.url === premium) return "premium";
  return "unknown";
}

export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ error: "stripe not configured" }, { status: 501 });
  }

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object as {
      id: string;
      client_reference_id?: string | null;
      payment_link?: string | null;
      amount_total?: number | null;
      currency?: string | null;
    };
    // Payment Links only carry one opaque string via client_reference_id, so
    // both ids are encoded as "leadId_uploadId" — Stripe only allows
    // alphanumeric/dash/underscore here and silently drops the whole value
    // for anything else (e.g. a colon), so "_" is the delimiter, not ":".
    // A single-segment value is a legacy in-flight link from before this
    // format shipped — still record the payment (uploadId left null) rather
    // than dropping the event.
    const [leadId, uploadIdFromRef] = (session.client_reference_id ?? "").split("_");
    if (!leadId) {
      return NextResponse.json({ received: true });
    }
    const uploadId = uploadIdFromRef || null;

    const status = event.type === "checkout.session.completed" ? "paid" : "failed";
    const tier = await resolveTier(session.payment_link ?? null);

    await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.upsert({
        where: { stripeSessionId: session.id },
        create: {
          leadId,
          uploadId,
          stripeSessionId: session.id,
          tier,
          status,
          amountTotal: session.amount_total ?? null,
          currency: session.currency ?? null,
        },
        update: {
          status,
          tier,
          amountTotal: session.amount_total ?? null,
          currency: session.currency ?? null,
        },
      });

      if (status === "paid" && payment.uploadId) {
        await tx.tradeUpload.update({
          where: { id: payment.uploadId },
          data: { status: "paid" },
        });
        await tx.analysisReport.upsert({
          where: { paymentId: payment.id },
          create: {
            uploadId: payment.uploadId,
            paymentId: payment.id,
            leadId,
            status: "pending",
          },
          update: {},
        });
      }
    });
  }

  return NextResponse.json({ received: true });
}

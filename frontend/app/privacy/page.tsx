import type { Metadata } from "next";
import type { ReactNode } from "react";
import CrystalLogo from "../components/CrystalLogo";

export const metadata: Metadata = {
  title: "Privacy Policy · Selnite",
  robots: { index: false },
};

const EMAIL = "info@indrolabs.ca";

const SECTIONS: { h: string; body: ReactNode }[] = [
  {
    h: "1. Who we are",
    body: "Selnite is operated by Indro Labs Inc., a corporation based in Calgary, Alberta, Canada. This policy explains what we collect, why, and what we do with it.",
  },
  {
    h: "2. What we collect",
    body: "We collect: (a) your email address when you sign up or contact us; (b) trade history and related information you choose to upload for analysis; (c) the answers you give in our short signup questionnaire; and (d) limited technical data such as basic usage and device information. Payment card details are collected and processed by Stripe. We never see or store your full card number.",
  },
  {
    h: "3. What we do not collect",
    body: "We never ask for or store your brokerage login credentials, and we never access or move your funds. Selnite analyzes only the information you choose to give us.",
  },
  {
    h: "4. How we use your information",
    body: "We use it to run the service (analyze your trades and return insights to you), to process your membership, to communicate with you about your account and onboarding, and to improve the product. We do not sell your data, and we do not use it for third-party advertising.",
  },
  {
    h: "5. Who we share it with",
    body: "We share data only with the service providers that help us operate: Stripe (payments), our hosting and database providers (for example Netlify and Neon), and form/email tools we use to receive your messages. These providers process data on our behalf under their own security terms. We may also disclose information if required by law.",
  },
  {
    h: "6. Where your data is stored",
    body: "Your data is stored on cloud infrastructure that may be located in Canada, the United States, or other regions where our providers operate. By using Selnite you consent to this processing.",
  },
  {
    h: "7. Data security",
    body: "We take reasonable measures to protect your information, including encryption in transit. No system is perfectly secure, but we limit access to your data and never sell it.",
  },
  {
    h: "8. Data retention",
    body: "We keep your information for as long as your account is active or as needed to provide the service and meet legal obligations. You can ask us to delete your data at any time.",
  },
  {
    h: "9. Your rights",
    body: "You can ask to access, correct, or delete the personal information we hold about you. To make a request, email us and we will respond within a reasonable time.",
  },
  {
    h: "10. Changes to this policy",
    body: "We may update this policy as the product evolves. If we make material changes, we will update the date below.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen text-ink">
      <header className="border-b border-line-soft px-6 py-5">
        <a href="/" className="mx-auto flex max-w-3xl items-center gap-2.5">
          <CrystalLogo size={20} />
          <span className="text-base font-semibold tracking-tight">Selnite</span>
        </a>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="display mb-2 text-3xl sm:text-4xl">Privacy Policy</h1>
        <p className="mb-12 text-[13px] text-ink-faint">Last updated: July 7, 2026</p>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="mb-2 text-[17px] font-bold tracking-tight text-ink">{s.h}</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}

          <section>
            <h2 className="mb-2 text-[17px] font-bold tracking-tight text-ink">11. Contact</h2>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Questions, or want your data deleted? Email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="underline decoration-ink-faint underline-offset-2 hover:text-ink"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-14 border-t border-line-soft pt-8 text-[13px] leading-relaxed text-ink-faint">
          Selnite is operated by Indro Labs Inc., a Canadian corporation based in Calgary,
          Alberta.
        </p>
      </main>
    </div>
  );
}

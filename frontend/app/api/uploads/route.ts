import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLead } from "@/lib/lead";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  const lead = await getCurrentLead();
  if (!lead?.clerkUserId) {
    return NextResponse.json({ error: "sign in required" }, { status: 401 });
  }
  const leadId = lead.id;

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "file too large or empty" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await prisma.tradeUpload.create({
    data: {
      leadId,
      filename: file.name,
      fileData: buffer,
      fileSize: file.size,
    },
  });

  return NextResponse.json({ id: upload.id, filename: upload.filename });
}

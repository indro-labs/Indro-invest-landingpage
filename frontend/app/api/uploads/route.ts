import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLeadId } from "@/lib/lead";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  const leadId = await getCurrentLeadId();
  if (!leadId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

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

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: "upload_done" },
  });

  return NextResponse.json({ id: upload.id, filename: upload.filename });
}

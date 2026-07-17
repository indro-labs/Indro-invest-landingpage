import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

async function main() {
  const { prisma } = await import("../lib/prisma");
  const uploads = await prisma.tradeUpload.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      filename: true,
      fileSize: true,
      status: true,
      createdAt: true,
      leadId: true,
      payment: true,
      report: true,
      lead: { select: { clerkUserId: true, email: true } },
    },
  });
  console.log(JSON.stringify(uploads, null, 2));
  await prisma.$disconnect();
}

main();

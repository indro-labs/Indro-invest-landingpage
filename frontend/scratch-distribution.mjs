import { PrismaClient } from "./app/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
config({ path: ".env.local" });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const leads = await prisma.lead.findMany({
  where: { traderType: { not: null } },
  select: { id: true, traderType: true, answers: true, createdAt: true },
  orderBy: { createdAt: "desc" },
});
console.log("Total leads with a traderType:", leads.length);
for (const l of leads) {
  console.log(l.createdAt.toISOString(), "->", l.traderType, "| answers:", JSON.stringify(l.answers));
}
await prisma.$disconnect();

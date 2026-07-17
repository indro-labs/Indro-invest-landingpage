import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey } from "@/lib/trader-types";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminUploadsPage() {
  const uploads = await prisma.tradeUpload.findMany({
    select: {
      id: true,
      filename: true,
      fileSize: true,
      status: true,
      createdAt: true,
      payment: { select: { status: true, tier: true } },
      report: { select: { status: true } },
      lead: {
        select: {
          email: true,
          currentTraderAssessment: { select: { traderType: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="display text-2xl mb-1 text-white">Uploads</h1>
      <p className="text-sm text-ink-faint mb-8">{uploads.length} total</p>

      <div className="flex flex-col gap-3">
        {uploads.map((u) => {
          const traderType = getTraderTypeByKey(u.lead.currentTraderAssessment?.traderType);
          return (
            <div
              key={u.id}
              className="rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap"
              style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
            >
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{u.filename}</p>
                <p className="text-xs text-ink-faint mt-0.5">
                  {u.lead.email ?? "no email on file"} · {formatSize(u.fileSize)} ·{" "}
                  {new Date(u.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-ink-faint mt-0.5">
                  {traderType.label} · upload: {u.status}
                  {u.payment && ` · payment: ${u.payment.status} (${u.payment.tier})`}
                  {u.report && ` · report: ${u.report.status}`}
                </p>
              </div>
              <a
                href={`/api/admin/uploads/${u.id}/download`}
                className="btn-ghost inline-flex items-center px-4 py-2 text-sm shrink-0"
              >
                Download
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { neon } from "@neondatabase/serverless";

/**
 * Records the /join funnel answers to Neon (Postgres). Best-effort: the
 * client fires this without blocking the checkout redirect, so a failure
 * here never stops someone from paying.
 *
 * Requires the DATABASE_URL env var (Neon connection string) locally in
 * .env.local and in Netlify's environment variables.
 */
export const runtime = "nodejs";

const FIELDS = ["experience", "struggle", "instrument", "today"] as const;

export async function POST(req: Request) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const get = (k: string) => {
    const v = body[k];
    return typeof v === "string" && v.trim() ? v.trim().slice(0, 500) : null;
  };

  try {
    const sql = neon(url);

    await sql`
      CREATE TABLE IF NOT EXISTS join_responses (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        experience TEXT,
        struggle TEXT,
        instrument TEXT,
        today TEXT
      )
    `;

    await sql`
      INSERT INTO join_responses (experience, struggle, instrument, today)
      VALUES (${get("experience")}, ${get("struggle")}, ${get("instrument")}, ${get("today")})
    `;

    return Response.json({ ok: true });
  } catch (err) {
    console.error("join_responses insert failed", err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

// Silence unused-warning tools while documenting the expected shape.
export type JoinAnswers = Partial<Record<(typeof FIELDS)[number], string>>;

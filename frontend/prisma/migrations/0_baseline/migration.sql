
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."join_responses" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experience" TEXT,
    "struggle" TEXT,
    "instrument" TEXT,
    "today" TEXT,

    CONSTRAINT "join_responses_pkey" PRIMARY KEY ("id")
);


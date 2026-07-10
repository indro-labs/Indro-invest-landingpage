"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

type Sniff = { rows: number; headers: string[] } | null;

const ACCEPTED = /\.(csv|xlsx|xls|pdf)$/i;

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16V4M12 4l-4 4M12 4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UploadDropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sniff, setSniff] = useState<Sniff>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => {
    setError("");
    if (!ACCEPTED.test(f.name)) {
      setError("Please upload a CSV, Excel, or PDF file.");
      return;
    }
    setFile(f);
    setSniff(null);
    if (/\.csv$/i.test(f.name)) {
      Papa.parse(f, {
        preview: 50,
        complete: (results) => {
          const rows = results.data as string[][];
          setSniff({ rows: rows.length, headers: rows[0] ?? [] });
        },
      });
    }
  };

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Upload failed");
      }
      router.push("/onboarding/sign-up");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? "border-accent bg-accent-soft" : "border-line hover:border-ink/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))" }}
        >
          <UploadIcon />
        </div>
        {file ? (
          <div>
            <p className="text-ink font-medium">{file.name}</p>
            {sniff ? (
              <p className="text-sm text-ink-faint mt-1">
                {sniff.rows} rows detected · {sniff.headers.length} columns
              </p>
            ) : (
              <p className="text-sm text-ink-faint mt-1">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-ink font-medium mb-1">Drop your trade history here</p>
            <p className="text-sm text-ink-faint">
              or click to browse · CSV, Excel, or PDF up to 20MB
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm mt-3" style={{ color: "var(--bad)" }}>{error}</p>}

      <button
        type="button"
        onClick={upload}
        disabled={!file || uploading}
        className="btn-solid mt-6 w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading…" : "Continue"}
        {!uploading && <span aria-hidden="true">→</span>}
      </button>
    </div>
  );
}

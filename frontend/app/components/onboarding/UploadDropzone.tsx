"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ACCEPTED = /\.(csv|xlsx|xls|pdf)$/i;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

type Status = "idle" | "uploading" | "processing" | "done";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function uploadWithProgress(
  file: File,
  onProgress: (pct: number) => void,
  onSent: () => void
) {
  return new Promise<{ id: string }>((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    // Browser finished sending bytes — server is now writing the file to
    // the database, which has no progress signal of its own.
    xhr.upload.onload = () => onSent();
    xhr.onload = () => {
      const body = (() => {
        try {
          return JSON.parse(xhr.responseText);
        } catch {
          return null;
        }
      })();
      if (xhr.status >= 200 && xhr.status < 300 && body?.id) {
        resolve(body);
      } else {
        reject(new Error(body?.error ?? "Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error. Please try again."));
    xhr.open("POST", "/api/uploads");
    xhr.send(data);
  });
}

export default function UploadDropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => {
    setError("");
    if (!ACCEPTED.test(f.name)) {
      setError("Please upload a CSV, Excel, or PDF file.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError("That file is over 20MB — try exporting a smaller date range.");
      return;
    }
    setFile(f);
  };

  const upload = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);
    setError("");
    try {
      const upload = await uploadWithProgress(file, setProgress, () => setStatus("processing"));
      setStatus("done");
      setTimeout(() => router.push(`/onboarding/payment?uploadId=${upload.id}`), 700);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <div
        className="rounded-2xl backdrop-blur-xl p-10 text-center"
        style={{ border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)" }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--good)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-white font-medium">Uploaded</p>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (status === "idle") setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (status !== "idle") return;
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        onClick={() => status === "idle" && inputRef.current?.click()}
        className={`rounded-2xl backdrop-blur-xl p-10 text-center transition-colors ${status === "idle" ? "cursor-pointer" : ""}`}
        style={{
          border: dragOver ? "1px solid rgba(167,139,250,0.55)" : "1px dashed var(--line-soft)",
          background: dragOver ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.03)",
        }}
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4M12 4l-4 4M12 4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {file ? (
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-white font-medium">{file.name}</p>
              {status === "idle" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setError("");
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  aria-label="Remove file"
                  className="text-ink-faint hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-sm text-ink-faint mt-1">{formatSize(file.size)}</p>
          </div>
        ) : (
          <div>
            <p className="text-white font-medium mb-1">Drop your trade history here</p>
            <p className="text-sm text-ink-faint">or click to browse · CSV, Excel, or PDF up to 20MB</p>
          </div>
        )}
      </div>

      {status === "uploading" && (
        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-200 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
              }}
            />
          </div>
          <p className="text-xs text-ink-faint mt-1.5">Uploading… {progress}%</p>
        </div>
      )}

      {status === "processing" && (
        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="glow-pulse h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-light))" }}
            />
          </div>
          <p className="text-xs text-ink-faint mt-1.5">Almost done — processing your file…</p>
        </div>
      )}

      {error && <p className="text-sm mt-3" style={{ color: "var(--bad)" }}>{error}</p>}

      <button
        type="button"
        onClick={upload}
        disabled={!file || status !== "idle"}
        className="btn-solid mt-6 w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "uploading" ? "Uploading…" : status === "processing" ? "Processing…" : "Continue"}
        {status === "idle" && <span aria-hidden="true">→</span>}
      </button>
    </div>
  );
}

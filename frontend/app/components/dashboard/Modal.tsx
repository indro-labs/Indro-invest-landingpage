"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

// Portals need a mounted document — this is the React-recommended way to
// read "are we on the client yet" without setState-in-effect (which our
// lint config treats as an error): client snapshot is always true, server
// snapshot is always false, so the first client render matches SSR output.
function useIsMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const mounted = useIsMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,5,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rise relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl p-7"
        style={{ border: "1px solid var(--line-soft)", background: "#141220" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:text-white"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <CloseIcon />
        </button>
        {title && (
          <p className="section-label mb-4 pr-10" style={{ color: "var(--accent-light)" }}>
            {title}
          </p>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

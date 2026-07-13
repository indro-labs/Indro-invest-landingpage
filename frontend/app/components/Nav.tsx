"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { useState } from "react";
import SelniteMark from "./SelniteMark";
import HomeLink from "./HomeLink";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 px-4 py-5 sm:px-8"
      style={{
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, transparent 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <HomeLink className="flex items-center gap-2 text-white">
          <SelniteMark size={20} />
          <span className="text-lg font-bold tracking-tight">
            Selnite
          </span>
        </HomeLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}

          {clerkEnabled && (
            <>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="btn-ghost inline-flex items-center px-5 py-2.5 text-sm"
                >
                  My account
                </Link>
              </Show>

              <Show when="signed-out">
                <Link
                  href="/onboarding/sign-in"
                  className="btn-ghost inline-flex items-center px-5 py-2.5 text-sm"
                >
                  Sign In
                </Link>
              </Show>
            </>
          )}

          <Link
            href="/onboarding/questions/1"
            className="btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            Get started
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur-xl sm:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-ink-soft hover:text-white"
            >
              {link.label}
            </a>
          ))}

          {clerkEnabled && (
            <>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="btn-ghost flex w-full justify-center gap-2 py-3 text-sm"
                >
                  My account
                </Link>
              </Show>

              <Show when="signed-out">
                <Link
                  href="/onboarding/sign-in"
                  className="btn-ghost flex w-full justify-center gap-2 py-3 text-sm"
                >
                  Sign In
                </Link>
              </Show>
            </>
          )}

          <Link
            href="/onboarding/questions/1"
            className="btn-solid flex w-full justify-center gap-2 py-3 text-sm"
          >
            Get started
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}
    </nav>
  );
}
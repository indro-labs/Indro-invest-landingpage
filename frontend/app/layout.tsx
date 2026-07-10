import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Selnite · Don't let emotions control your trades",
  description:
    "Selnite finds the hidden pattern costing you money, then gives you a clear rule to catch it before your next trade.",
};

// Clerk isn't configured in every environment yet — skip the provider
// rather than crash the whole site when the publishable key is unset.
const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );

  return clerkEnabled ? <ClerkProvider>{body}</ClerkProvider> : body;
}

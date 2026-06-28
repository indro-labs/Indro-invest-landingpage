import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selnite · a behavioural lens on your trading",
  description:
    "Selnite takes a behavioural analysis lens to your trades: how you really trade, how you compare to the market, and the exact patterns hurting you and the ones paying you. Built by traders with a psychology background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service · Selnite",
  description: "The terms governing your use of Selnite, operated by Indro Labs Inc.",
};

const SECTIONS = [
  {
    number: 1,
    heading: "Agreement",
    body: "These Terms of Service govern your use of Selnite, a behavioral trading analytics product operated by Indro Labs Inc. By creating an account, joining as a founding member, or otherwise using Selnite, you agree to these terms. If you do not agree, please do not use the service.",
  },
  {
    number: 2,
    heading: "Who we are",
    body: "Selnite is operated by Indro Labs Inc., a corporation incorporated in Canada and based in Calgary, Alberta. Where these terms say “we,” “us,” or “Selnite,” they refer to Indro Labs Inc.",
  },
  {
    number: 3,
    heading: "What Selnite is, and is not",
    body: "Selnite is an analytics tool that reviews trading history you provide and surfaces behavioral patterns and suggestions. Selnite is not a financial advisor, broker, dealer, or investment adviser, and nothing it produces is financial, investment, legal, or tax advice. Trading involves substantial risk of loss. Any decision you make is your own, and you are solely responsible for it. Selnite never places trades, never accesses your funds, and never connects to your brokerage to transact.",
  },
  {
    number: 4,
    heading: "Founding membership and pricing",
    body: "Selnite is in active development. Founding membership gives you access to features as they ship and the chance to share early feedback. Founding members' feedback may inform our roadmap, but we do not guarantee that any particular feature, suggestion, or timeline will be delivered. The founding price is $99 USD for the first year. Features described on our site may change, and some are still being built.",
  },
  {
    number: 5,
    heading: "Billing, renewal, and cancellation",
    body: "Payments are processed by Stripe. Your first year is billed at $99. Unless you cancel before your renewal date, your membership renews for another year at the then-current standard price (currently $299 USD). We will email you before any renewal. You can cancel at any time by emailing us, and cancellation takes effect at the end of your current paid term.",
  },
  {
    number: 6,
    heading: "Refunds",
    body: "If you are not satisfied, email us and we will refund your payment in full. We keep this simple on purpose: one email, no forms.",
  },
  {
    number: 7,
    heading: "Your data",
    body: "Any trade history or information you upload remains yours. How we handle it is described in our Privacy Policy. We do not sell your data.",
  },
  {
    number: 8,
    heading: "Acceptable use",
    body: "You agree to use Selnite only for lawful purposes and not to misuse, disrupt, reverse engineer, or attempt to gain unauthorized access to the service. You are responsible for keeping your account credentials secure.",
  },
  {
    number: 9,
    heading: "Service provided “as is”",
    body: "Selnite is provided on an “as is” and “as available” basis while in active development. We make no warranty that the service will be uninterrupted, error-free, or that any insight will improve your trading results.",
  },
  {
    number: 10,
    heading: "Limitation of liability",
    body: "To the fullest extent permitted by law, Indro Labs Inc. is not liable for any trading losses or for any indirect, incidental, or consequential damages arising from your use of Selnite. Our total liability for any claim is limited to the amount you paid us in the twelve months before the claim.",
  },
  {
    number: 11,
    heading: "Changes to these terms",
    body: "We may update these terms as the product evolves. If we make material changes, we will update the date below and, where appropriate, notify you. Continued use after changes means you accept the updated terms.",
  },
  {
    number: 12,
    heading: "Governing law",
    body: "These terms are governed by the laws of the Province of Alberta and the federal laws of Canada applicable there, without regard to conflict-of-law rules.",
  },
  {
    number: 13,
    heading: "Contact",
    body: "Questions about these terms? Email info@indrolabs.ca.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 7, 2026"
      sections={SECTIONS}
      closing="Selnite is operated by Indro Labs Inc., a Canadian corporation based in Calgary, Alberta."
    />
  );
}

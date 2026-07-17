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
    heading: "Reports are human-reviewed, not automated",
    body: "Every Behavior Analysis Report is prepared with review by a human analyst — a psychology graduate who trades — applying their own professional judgment to the trading history you upload. It is not a fully automated or algorithmically guaranteed output. Two qualified reviewers may reach different conclusions from the same data, and the observations, tone, and depth of a report reflect that reviewer's professional judgment at the time. A report you disagree with, or that does not tell you what you hoped to hear, is not on its own evidence of a defect in the service.",
  },
  {
    number: 5,
    heading: "Pricing and early access",
    body: "Selnite is in active development. The Behavior Analysis Report is available as a one-time purchase for $11.99 CAD. Customers who purchase during this early period are recognized as founding members — this reflects when you joined, not a separate paid tier, subscription, or ongoing commitment. We do not guarantee that any particular feature, suggestion, or timeline will be delivered. Features described on our site may change, and some, including the full dashboard, are still being built.",
  },
  {
    number: 6,
    heading: "Billing and payment",
    body: "Payments are processed by Stripe. You are charged once, at checkout, for the report you purchase. There is no subscription and no recurring charge, so there is nothing to renew and nothing to cancel.",
  },
  {
    number: 7,
    heading: "One-time report purchases and the dashboard",
    body: "Behavior Analysis Reports are sold as a one-time purchase covering a single report. This purchase does not include, and is not conditioned on, access to any dashboard, ongoing analytics platform, or future feature. A full interactive dashboard is in active development, but its features, launch date, and eventual availability are not guaranteed and are not part of what you are charged for today. Because you are not being charged for the dashboard, its delay, changes in scope, or non-launch does not entitle you to a refund, credit, or any other claim against Indro Labs Inc.",
  },
  {
    number: 8,
    heading: "Refunds",
    body: "We'll refund you in full if we failed to deliver your report, made a billing error, or charged you more than once for the same purchase — just email us. Because reports reflect a human reviewer's professional judgment applied to the data you provide, disagreement with a report's conclusions, tone, or depth is not, on its own, grounds for a refund. Nor is dissatisfaction that a feature described as upcoming — including the dashboard referenced above — has not yet launched.",
  },
  {
    number: 9,
    heading: "Your data",
    body: "Any trade history or information you upload remains yours. How we handle it is described in our Privacy Policy. We do not sell your data.",
  },
  {
    number: 10,
    heading: "Acceptable use",
    body: "You agree to use Selnite only for lawful purposes and not to misuse, disrupt, reverse engineer, or attempt to gain unauthorized access to the service. You are responsible for keeping your account credentials secure.",
  },
  {
    number: 11,
    heading: "Service provided “as is”",
    body: "Selnite is provided on an “as is” and “as available” basis while in active development. We make no warranty that the service will be uninterrupted, error-free, or that any insight will improve your trading results.",
  },
  {
    number: 12,
    heading: "Limitation of liability",
    body: "To the fullest extent permitted by law, Indro Labs Inc. is not liable for any trading losses, for the accuracy, completeness, or conclusions of any report or analysis, for delays or changes to any upcoming feature (including the dashboard), or for any indirect, incidental, or consequential damages arising from your use of Selnite. Our total liability for any claim is limited to the amount you actually paid us for the specific purchase giving rise to the claim.",
  },
  {
    number: 13,
    heading: "Changes to these terms",
    body: "We may update these terms as the product evolves. If we make material changes, we will update the date below and, where appropriate, notify you. Continued use after changes means you accept the updated terms.",
  },
  {
    number: 14,
    heading: "Governing law",
    body: "These terms are governed by the laws of the Province of Alberta and the federal laws of Canada applicable there, without regard to conflict-of-law rules.",
  },
  {
    number: 15,
    heading: "Contact",
    body: "Questions about these terms? Email info@indrolabs.ca.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 16, 2026"
      sections={SECTIONS}
      closing="Selnite is operated by Indro Labs Inc., a Canadian corporation based in Calgary, Alberta."
    />
  );
}

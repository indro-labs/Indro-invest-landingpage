import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy · Selnite",
  description: "How Selnite and Indro Labs Inc. collect, use, and protect your information.",
};

const SECTIONS = [
  {
    number: 1,
    heading: "Who we are",
    body: "Selnite is operated by Indro Labs Inc., a corporation based in Calgary, Alberta, Canada. This policy explains what we collect, why, and what we do with it.",
  },
  {
    number: 2,
    heading: "What we collect",
    body: "We collect: (a) your email address when you sign up or contact us; (b) trade history and related information you choose to upload for analysis; (c) the answers you give in our short signup questionnaire; and (d) limited technical data such as basic usage and device information. Payment card details are collected and processed by Stripe. We never see or store your full card number.",
  },
  {
    number: 3,
    heading: "What we do not collect",
    body: "We never ask for or store your brokerage login credentials, and we never access or move your funds. Selnite analyzes only the information you choose to give us.",
  },
  {
    number: 4,
    heading: "How we use your information",
    body: "We use it to run the service (analyze your trades and return insights to you), to process your membership, to communicate with you about your account and onboarding, and to improve the product. Your uploaded trade history is reviewed by a human analyst as part of preparing your report, not only processed automatically. We do not sell your data, and we do not use it for third-party advertising.",
  },
  {
    number: 5,
    heading: "Who we share it with",
    body: "We share data only with the service providers that help us operate: Stripe (payments), our hosting and database providers (for example Netlify and Neon), and form/email tools we use to receive your messages. These providers process data on our behalf under their own security terms. We may also disclose information if required by law.",
  },
  {
    number: 6,
    heading: "Where your data is stored",
    body: "Your data is stored on cloud infrastructure that may be located in Canada, the United States, or other regions where our providers operate. By using Selnite you consent to this processing.",
  },
  {
    number: 7,
    heading: "Data security",
    body: "We take reasonable measures to protect your information, including encryption in transit. No system is perfectly secure, but we limit access to your data and never sell it.",
  },
  {
    number: 8,
    heading: "Data retention",
    body: "We keep your information for as long as your account is active or as needed to provide the service and meet legal obligations. You can ask us to delete your data at any time.",
  },
  {
    number: 9,
    heading: "Your rights",
    body: "You can ask to access, correct, or delete the personal information we hold about you. To make a request, email us and we will respond within a reasonable time.",
  },
  {
    number: 10,
    heading: "Changes to this policy",
    body: "We may update this policy as the product evolves. If we make material changes, we will update the date below.",
  },
  {
    number: 11,
    heading: "Contact",
    body: "Questions, or want your data deleted? Email info@indrolabs.ca.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 16, 2026"
      sections={SECTIONS}
      closing="Selnite is operated by Indro Labs Inc., a Canadian corporation based in Calgary, Alberta."
    />
  );
}

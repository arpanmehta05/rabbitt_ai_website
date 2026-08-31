import type { Metadata } from "next";
import PrivacyPolicyViewer, { type PrivacySection } from "@/components/PrivacyPolicyViewer";

export const metadata: Metadata = {
  title: "Privacy Policy — Rabbitt AI",
  description:
    "Rabbitt AI is committed to protecting your privacy. Read our Privacy Policy to understand how we collect, use, and protect your personal information.",
};

const sections: PrivacySection[] = [
  {
    id: "purpose",
    title: "Purpose",
    content: [
      'Rabbitt AI (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) is committed to protecting your privacy and handling your personal information with transparency, integrity, and care. This Privacy Policy describes how we collect, use, share, and secure personal information when you interact with our website, products, and mobile applications \u2014 including but not limited to rabbitt.ai.',
      "It also explains your rights regarding access, correction, deletion of your data, and withdrawal of consent. This policy applies to all services we provide. Any reference to personal data includes sensitive information where applicable under relevant law.",
    ],
  },
  {
    id: "notice",
    title: "Notice to End Users",
    content: [
      "In some cases, an administrator — such as your employer or a training partner — may provide your personal data to Rabbitt AI on your behalf. In such instances, this administrator is considered our \"Client.\" Your usage of our platform may be governed by the privacy policies established by your employer or training partner.",
      "If this applies to you, please direct privacy inquiries to your administrator first. We will cooperate with administrators in handling data subject requests in accordance with applicable law.",
    ],
  },
  {
    id: "data-collection",
    title: "Data We Collect",
    content: [
      "We collect information that is necessary to provide, improve, and personalise our services. This includes:",
    ],
    list: [
      {
        term: "Personal Identification Data",
        detail:
          "Name, email address, phone number, job title, mailing address, and similar contact details you provide directly.",
      },
      {
        term: "Financial Data",
        detail:
          "Payment and billing information, processed exclusively through secure, PCI-DSS-compliant third-party payment gateways. We do not store full card numbers or CVV codes.",
      },
      {
        term: "Device & Usage Data",
        detail:
          "IP address, browser type, operating system, referring URLs, pages visited, time spent, and other diagnostic information collected automatically when you use our services.",
      },
      {
        term: "Account & Profile Data",
        detail:
          "Credentials, preferences, course progress, certifications, and other information you provide when creating or maintaining an account.",
      },
    ],
  },
  {
    id: "use",
    title: "How We Use Your Information",
    content: [
      "We use the data we collect for the following purposes:",
    ],
    bullets: [
      "Provide, administer, and personalise the services you request — including course enrolment, AI product access, and certification.",
      "Communicate service updates, security alerts, and transactional messages relevant to your account.",
      "Send promotional communications where you have given consent, with the ability to opt out at any time.",
      "Process secure payments and verify your identity for platform access.",
      "Analyse usage patterns to improve our products, fix bugs, and develop new features.",
      "Comply with legal obligations and enforce our terms of service.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Sharing",
    content: [
      "We do not sell your personal data. We share information only in the following limited circumstances:",
    ],
    list: [
      {
        term: "Educational & Delivery Partners",
        detail:
          "For course delivery, mentorship, and certification issuance, under strict confidentiality agreements.",
      },
      {
        term: "Payment Processors",
        detail:
          "To process transactions securely. These processors comply with PCI-DSS and are contractually bound to protect your data.",
      },
      {
        term: "Sponsoring Employers",
        detail:
          "If your employer sponsors your enrolment, relevant progress and completion data may be shared with them.",
      },
      {
        term: "Analytics & Infrastructure Providers",
        detail:
          "Trusted sub-processors that help us operate, secure, and improve our services — each bound by data processing agreements.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Privacy",
    content: [
      "All payment transactions are processed by PCI-DSS-compliant third-party providers. Rabbitt AI never stores sensitive payment credentials such as full card numbers, CVV codes, or banking passwords. Only the last four digits of a card number may be retained for reference and reconciliation purposes.",
      "Our payment partners are contractually required to maintain the same level of data protection that we adhere to under this policy.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to operate and improve our services. Specifically:",
    ],
    list: [
      {
        term: "Essential Cookies",
        detail:
          "Required for core site functionality, authentication, and security. Cannot be disabled without impacting service availability.",
      },
      {
        term: "Analytics Cookies",
        detail:
          "Used to understand how visitors interact with our site (pages visited, session length, error events) so we can improve performance.",
      },
      {
        term: "Personalisation Cookies",
        detail:
          "Enable us to remember your preferences and tailor content to your interests.",
      },
    ],
    footer:
      "You can manage or disable non-essential cookies through your browser settings. Note that disabling certain cookies may affect your experience on our platform.",
  },
  {
    id: "international",
    title: "International Data Transfers",
    content: [
      "Rabbitt AI operates globally. Your personal data may be stored and processed in countries including India, the United States, and other locations where we or our service providers maintain infrastructure. Data protection standards vary by jurisdiction.",
      "For users in the European Economic Area (EEA), United Kingdom, or Switzerland, we ensure that international data transfers are conducted under appropriate safeguards — such as Standard Contractual Clauses approved by the European Commission — in compliance with GDPR and equivalent frameworks.",
    ],
  },
  {
    id: "security",
    title: "Security Measures",
    content: [
      "We implement technical and organisational measures designed to protect your personal data against unauthorised access, loss, alteration, or disclosure. Our security practices include:",
    ],
    bullets: [
      "TLS/SSL encryption for all data in transit between your device and our servers.",
      "Encryption of sensitive data at rest using industry-standard algorithms.",
      "Strict role-based access controls ensuring only authorised personnel handle personal data.",
      "Regular security audits, vulnerability assessments, and penetration testing.",
      "Compliance with GDPR, the Indian IT Act, and other applicable data protection laws.",
      "Incident response procedures to detect, contain, and notify affected parties in the event of a data breach.",
    ],
  },
  {
    id: "third-party-sources",
    title: "Data from Third-Party Sources",
    content: [
      "We may receive information about you from third-party sources to supplement data you provide directly. This includes:",
    ],
    bullets: [
      "Social platforms such as LinkedIn, where you have granted us permission to access specific profile data.",
      "Partners and affiliates who help us provide or promote our services.",
      "Publicly available databases used for demographic or business insights.",
    ],
    footer:
      "We handle such third-party data under the same standards described in this policy.",
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      "Depending on your location and applicable law, you have rights with respect to your personal data. These include:",
    ],
    bullets: [
      "Access — request a copy of the personal data we hold about you.",
      "Correction — request that inaccurate or incomplete data be updated.",
      "Deletion — request erasure of your data, subject to legal retention obligations.",
      "Restriction — request that we limit how we use your data in certain circumstances.",
      "Portability — receive your data in a structured, machine-readable format.",
      "Objection — object to processing based on legitimate interests or for direct marketing.",
      "Consent Withdrawal — withdraw previously given consent at any time, without affecting processing already carried out.",
    ],
    footer:
      "To exercise any of these rights, contact us at sales@rabbitt.ai. We will respond within 30 days.",
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    content: [
      "For users in jurisdictions that require a legal basis for data processing (such as the EEA under GDPR), we rely on one or more of the following:",
    ],
    list: [
      {
        term: "Consent",
        detail:
          "You have given clear, informed consent to process your data for a specific purpose.",
      },
      {
        term: "Contractual Necessity",
        detail:
          "Processing is required to fulfil a contract with you or to take steps at your request prior to entering one.",
      },
      {
        term: "Legitimate Interest",
        detail:
          "Processing is necessary for our legitimate business interests, provided those interests are not overridden by your rights.",
      },
      {
        term: "Legal Obligation",
        detail:
          "Processing is required to comply with a legal or regulatory obligation.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please reach out to our Data Privacy Officer:",
    ],
    contact: {
      email: "sales@rabbitt.ai",
      note: "We aim to respond to all privacy inquiries within 5 business days.",
    },
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 2025";

  return (
    <PrivacyPolicyViewer
      sections={sections}
      lastUpdated={lastUpdated}
    />
  );
}


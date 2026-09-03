import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rabbitt.ai"),
  title: {
    default: "Rabbitt AI — Own Your Data. Own Your AI.",
    template: "%s | Rabbitt AI",
  },
  description:
    "Next-generation enterprise generative AI solutions. Build, fine-tune, and deploy sovereign LLMs on private enterprise data.",
  applicationName: "Rabbitt AI",
  authors: [{ name: "Rabbitt AI", url: "https://rabbitt.ai" }],
  generator: "Next.js",
  keywords: [
    "Rabbitt AI",
    "Enterprise Generative AI",
    "Custom LLMs",
    "ChanceRAG",
    "Data Annotation",
    "Harneet Singh",
    "Sovereign AI",
    "Private Cloud AI",
    "AI Consulting",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  alternates: {
    canonical: "https://rabbitt.ai",
  },
  openGraph: {
    title: "Rabbitt AI — Own Your Data. Own Your AI.",
    description:
      "Next-generation enterprise generative AI solutions. Build, fine-tune, and deploy sovereign LLMs on private enterprise data.",
    url: "https://rabbitt.ai",
    siteName: "Rabbitt AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Rabbitt AI — Own Your Data. Own Your AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabbitt AI — Own Your Data. Own Your AI.",
    description:
      "Next-generation enterprise generative AI solutions. Build, fine-tune, and deploy sovereign LLMs on private enterprise data.",
    creator: "@rabbitt_ai",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rabbitt.ai/#organization",
      name: "Rabbitt AI",
      url: "https://rabbitt.ai",
      logo: "https://rabbitt.ai/logo.svg",
      description:
        "London-based generative AI startup helping enterprises build reliable, custom AI solutions on their own private data.",
      foundingDate: "2023",
      founder: {
        "@type": "Person",
        name: "Harneet Singh",
        jobTitle: "Founder & Chief AI Officer",
        alumniOf: "IIT Delhi",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@rabbitt.ai",
        telephone: "+91-9911059386",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://rabbitt.ai/#website",
      url: "https://rabbitt.ai",
      name: "Rabbitt AI",
      publisher: {
        "@id": "https://rabbitt.ai/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="rabbitt-intro"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='rabbitt_intro_timestamp';var t=localStorage.getItem(k);var c=document.cookie.indexOf('rabbitt_intro_seen=true')!==-1;if(c||(t&&(Date.now()-parseInt(t,10))<86400000)){document.documentElement.classList.add('skip-intro');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.className} font-sans min-h-full flex flex-col`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

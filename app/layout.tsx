import type { Metadata } from "next";
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
  title: "Rabbitt AI — Build at lightspeed",
  description:
    "Next-generation platform for high-velocity software engineering.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='rabbitt_intro_timestamp';var t=localStorage.getItem(k);var c=document.cookie.indexOf('rabbitt_intro_seen=true')!==-1;if(c||(t&&(Date.now()-parseInt(t,10))<86400000)){document.documentElement.classList.add('skip-intro');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.className} font-sans min-h-full flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  generateInternalLeadEmailHtml,
  generateProspectReceiptEmailHtml,
} from "@/lib/contact-email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured on the server. Please set it in your .env.local file." },
        { status: 500 }
      );
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      message: message.trim(),
      date: new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " UTC",
    };
    const resend = new Resend(apiKey);
    const salesEmail = process.env.SALES_EMAIL || "sales@rabbitt.ai";
    const fromEmail = process.env.FROM_EMAIL || "Rabbitt AI <onboarding@resend.dev>";

    const [salesResult, receiptResult] = await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: salesEmail,
        replyTo: data.email,
        subject: `New Lead: ${data.name}${data.company ? ` (${data.company})` : ""}`,
        html: generateInternalLeadEmailHtml(data),
      }),
      resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: "We've received your inquiry — Rabbitt AI",
        html: generateProspectReceiptEmailHtml(data),
      }),
    ]);

    if (salesResult.status === "rejected") {
      console.error("Failed to send sales notification email:", salesResult.reason);
      return NextResponse.json(
        { error: salesResult.reason?.message || "Failed to dispatch sales notification." },
        { status: 500 }
      );
    }
    if (salesResult.value.error) {
      console.error("Resend API error sending sales email:", salesResult.value.error);
      return NextResponse.json(
        { error: salesResult.value.error.message || "Failed to send sales email." },
        { status: 500 }
      );
    }

    let receiptWarning: string | null = null;
    if (receiptResult.status === "rejected") {
      console.warn("User receipt failed to send:", receiptResult.reason);
      receiptWarning = "User confirmation could not be delivered in test mode (requires verified domain).";
    } else if (receiptResult.value.error) {
      console.warn("User receipt failed to send:", receiptResult.value.error);
      receiptWarning = receiptResult.value.error.message;
    }

    return NextResponse.json(
      { success: true, messageId: salesResult.value.data?.id, receiptWarning },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Unexpected error in contact API:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

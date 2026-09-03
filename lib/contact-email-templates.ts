export type ContactEmailData = {
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render(template: string, data: ContactEmailData): string {
  const values: Record<string, string> = {
    "{{name}}": escapeHtml(data.name),
    "{{email}}": escapeHtml(data.email),
    "{{company}}": escapeHtml(data.company || "Not specified"),
    "{{message}}": escapeHtml(data.message).replace(/\r?\n/g, "<br>"),
    "{{date}}": escapeHtml(data.date),
    "{{reply_url}}": `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent("Re: Rabbitt AI inquiry")}`,
  };

  return template.replace(/{{(?:name|email|company|message|date|reply_url)}}/g, (token) => values[token]);
}

// Paste-ready table markup. Runtime data is deliberately rendered from {{placeholders}}.
const prospectReceiptTemplate = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>We've received your inquiry — Rabbitt AI</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7FB;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#F4F7FB;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px;">
          <tr><td style="height:5px; background-color:#38BDF8; border-radius:16px 16px 0 0; font-size:0; line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:36px 40px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:700; letter-spacing:-0.7px; line-height:30px;">Rabbitt<span style="color:#0284C7;"> AI</span></td>
                  <td align="right" style="color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:1.1px; line-height:16px; text-transform:uppercase;">Enterprise AI</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0 0 16px; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:32px; font-weight:700; letter-spacing:-1px; line-height:39px;">We've received<br>your inquiry.</p>
              <p style="margin:0; color:#475569; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:25px;">Hi {{name}}, thank you for getting in touch. Our solutions team is reviewing your requirements and will respond within <strong style="color:#0F172A; font-weight:700;">2–4 business hours.</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#F8FBFE; border:1px solid #D9EDF9; border-radius:10px;">
                <tr><td style="padding:20px 22px 12px; color:#0284C7; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:1.2px; line-height:16px; text-transform:uppercase;">Your inquiry</td></tr>
                <tr>
                  <td style="padding:0 22px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td width="108" style="width:108px; padding:7px 0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:19px;">Name</td><td style="padding:7px 0; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:19px;">{{name}}</td></tr>
                      <tr><td width="108" style="width:108px; padding:7px 0 15px; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:19px;">Company</td><td style="padding:7px 0 15px; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:19px;">{{company}}</td></tr>
                      <tr><td colspan="2" style="padding:15px 0 0; border-top:1px solid #D9EDF9; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:19px;">Message summary</td></tr>
                      <tr><td colspan="2" style="padding:6px 0 0; color:#334155; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:22px;">{{message}}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 36px;">
              <p style="margin:0 0 5px; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:700; line-height:22px;">Enterprise Solutions Team</p>
              <p style="margin:0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px;">Rabbitt AI</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px; background-color:#F8FAFC; border-top:1px solid #E2E8F0; border-radius:0 0 16px 16px; text-align:center;">
              <p style="margin:0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:20px;"><a href="https://rabbitt.ai/docs" style="color:#0284C7; text-decoration:none;">Documentation</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://rabbitt.ai/security" style="color:#0284C7; text-decoration:none;">Security whitepaper</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://rabbitt.ai/contactus" style="color:#0284C7; text-decoration:none;">Schedule a call</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const internalLeadTemplate = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>New inquiry — Rabbitt AI</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7FB;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#F4F7FB;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px;">
          <tr><td style="height:5px; background-color:#38BDF8; border-radius:16px 16px 0 0; font-size:0; line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:34px 40px 24px; border-bottom:1px solid #E2E8F0;">
              <p style="margin:0 0 16px; color:#0284C7; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:1.2px; line-height:16px; text-transform:uppercase;">Rabbitt AI · Sales desk</p>
              <p style="margin:0; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:29px; font-weight:700; letter-spacing:-0.8px; line-height:36px;">A new inquiry is ready for review.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; border:1px solid #E2E8F0; border-radius:10px;">
                <tr><td width="156" style="width:156px; padding:14px 18px; border-bottom:1px solid #E2E8F0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; line-height:18px;">PROSPECT</td><td style="padding:14px 18px; border-bottom:1px solid #E2E8F0; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:18px;">{{name}}</td></tr>
                <tr><td width="156" style="width:156px; padding:14px 18px; border-bottom:1px solid #E2E8F0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; line-height:18px;">WORK EMAIL</td><td style="padding:14px 18px; border-bottom:1px solid #E2E8F0; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:18px;"><a href="mailto:{{email}}" style="color:#0284C7; text-decoration:none;">{{email}}</a></td></tr>
                <tr><td width="156" style="width:156px; padding:14px 18px; border-bottom:1px solid #E2E8F0; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; line-height:18px;">ORGANIZATION</td><td style="padding:14px 18px; border-bottom:1px solid #E2E8F0; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:18px;">{{company}}</td></tr>
                <tr><td width="156" style="width:156px; padding:14px 18px; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; line-height:18px;">SUBMITTED</td><td style="padding:14px 18px; color:#0F172A; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:18px;">{{date}}</td></tr>
              </table>
            </td>
          </tr>
          <tr><td style="padding:0 40px 10px; color:#0284C7; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:1.2px; line-height:16px; text-transform:uppercase;">Inquiry</td></tr>
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#F8FBFE; border-left:4px solid #38BDF8; border-radius:0 8px 8px 0;"><tr><td style="padding:20px 22px; color:#334155; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px;">{{message}}</td></tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#0284C7; border-radius:7px;"><a href="{{reply_url}}" style="display:inline-block; padding:14px 22px; color:#FFFFFF; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; line-height:18px; text-decoration:none;">Reply to lead</a></td></tr></table>
            </td>
          </tr>
          <tr><td style="padding:19px 40px; background-color:#F8FAFC; border-top:1px solid #E2E8F0; border-radius:0 0 16px 16px; color:#64748B; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:16px; text-align:center;">Rabbitt AI · Contact form notification</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export function generateProspectReceiptEmailHtml(data: ContactEmailData): string {
  return render(prospectReceiptTemplate, data);
}

export function generateInternalLeadEmailHtml(data: ContactEmailData): string {
  return render(internalLeadTemplate, data);
}

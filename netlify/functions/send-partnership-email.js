const handler = async function (event) {
  // Only accept POST.
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }
  if (!event.body) {
    return json(400, { error: "Payload required" });
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return json(400, { error: "Invalid JSON" });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const company = (data.company || "").trim();

  // Server-side validation of the lead-capture fields.
  if (!name || !company || !/^\S+@\S+\.\S+$/.test(email)) {
    return json(422, { error: "Please provide a full name, a valid email, and a company name." });
  }

  const siteUrl = process.env.URL || "";
  const firstName = name.split(/\s+/)[0];

  const body = {
    from: process.env.PARTNERSHIP_FROM_EMAIL || "george.clarke@weforest.org",
    to: email,
    subject: `Your WeForest partnership idea${data.campaignName ? `: ${data.campaignName}` : ""}`,
    parameters: {
      firstName,
      name,
      company,
      campaignName: data.campaignName || "Your WeForest partnership",
      modelName: data.modelName || "",
      programmeName: data.programmeName || "",
      programmeRegion: data.programmeRegion || "",
      whyItFits: data.whyItFits || "",
      objective: data.objective || "",
      partnershipUrl: data.partnershipUrl || siteUrl,
      logoUrl: siteUrl ? `${siteUrl}/assets/logo-white.png` : "",
      year: String(new Date().getFullYear()),
    },
  };

  // Optional: send a copy to the Partnerships team so the form acts as a lead capture.
  if (process.env.PARTNERSHIP_NOTIFY_EMAIL) {
    body.bcc = process.env.PARTNERSHIP_NOTIFY_EMAIL;
  }

  try {
    const res = await fetch(`${siteUrl}/.netlify/functions/emails/partnership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json(502, { error: "The email provider rejected the request.", detail });
    }
    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: e.message || "Unexpected error sending email." });
  }
};

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
}

module.exports = { handler };

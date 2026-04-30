const TO_EMAIL = "kukyslukas@gmail.com";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  const { name, contact, service, place, message } = request.body || {};
  const safeName = String(name || "Nenurodyta").trim();
  const safeContact = String(contact || "Nenurodyta").trim();
  const safeService = String(service || "").trim();
  const safePlace = String(place || "").trim();
  const safeMessage = String(message || "Nenurodyta").trim();

  const rows = [
    ["Vardas", safeName],
    ["Kontaktas", safeContact],
    safeService ? ["Paslauga", safeService] : null,
    safePlace ? ["Objekto vieta", safePlace] : null,
    ["Užklausa", safeMessage],
  ].filter(Boolean);

  const htmlRows = rows
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`)
    .join("");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "Plieno kodas <onboarding@resend.dev>",
        to: TO_EMAIL,
        reply_to: safeContact.includes("@") ? safeContact : undefined,
        subject: "Nauja užklausa iš plienokodas.lt",
        html: `<h2>Nauja užklausa</h2>${htmlRows}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return response.status(502).json({ error: "Email provider error", details: errorText });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(502).json({ error: "Email provider unreachable", details: error.message });
  }
}

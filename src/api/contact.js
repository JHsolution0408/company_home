const FORM_ID = "1FAIpQLSevzyNjaOZgz-BS6UFH-Dzc1R-dWoVrwaFz_Ed4I7rS1ij6gg";
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// 문의하기 Google Form Handler: /api/contact
// src\api\contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { name, email, phone, inquiryType, message } = body || {};

    // 1) 서버 쪽 검증 (필수/형식)
    if (!name || !email || !phone || !inquiryType || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // 2) Google Form entry.*
    const formData = new URLSearchParams();
    formData.append("entry.1036932536", String(name));
    formData.append("entry.566651998", String(email));
    formData.append("entry.342281593", String(phone));

    // 체크박스는 같은 key로 여러번 append
    if (Array.isArray(inquiryType)) {
      inquiryType.forEach((v) => {
        formData.append("entry.1680627342", String(v));
      });
    } else {
      formData.append("entry.1680627342", String(inquiryType));
    }

    formData.append("entry.2056535953", String(message));

    // 3) Google Form 제출
    const resp = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      redirect: "follow",
    });

    const ok = resp.status >= 200 && resp.status < 400;
    return res.status(ok ? 200 : 502).json({ ok });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { buildLivretHtml } from "@/lib/buildLivretHtml";

const FOOTER_HTML = `<html><head><style>
body{font-family:'Segoe UI',Calibri,sans-serif;font-size:7pt;color:#999;margin:0;padding:0 16mm}
.footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #ddd;padding-top:4px}
</style></head><body>
<div class="footer"><span>HEOL GROUP</span><span>Page <span class="pageNumber"></span>/<span class="totalPages"></span></span></div>
</body></html>`;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const html = buildLivretHtml(data);

    const url = process.env.GOTENBERG_URL;
    const user = process.env.GOTENBERG_USER;
    const pass = process.env.GOTENBERG_PASS;

    if (!url || !user || !pass) {
      return NextResponse.json({ error: "Gotenberg non configure" }, { status: 500 });
    }

    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("files", new Blob([FOOTER_HTML], { type: "text/html" }), "footer.html");
    form.append("marginTop", "0.7");
    form.append("marginBottom", "0.85");
    form.append("marginLeft", "0.63");
    form.append("marginRight", "0.63");
    form.append("paperWidth", "8.27");
    form.append("paperHeight", "11.69");
    form.append("printBackground", "true");

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64"),
      },
      body: form,
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Gotenberg error:", resp.status, text);
      return NextResponse.json({ error: "Erreur Gotenberg: " + resp.status }, { status: 502 });
    }

    const pdf = await resp.arrayBuffer();
    const nom = (data.nom || "apprenant").toLowerCase().replace(/\s+/g, "-");

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="livret-accueil-${nom}.pdf"`,
      },
    });
  } catch (err) {
    console.error("generate-pdf error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const redirect = searchParams.get("redirect") || (searchParams.has("redirect") ? null : searchParams.get("r")) || "no";

  if (redirect !== "no") {
    let do_redirect = true;
    let redirectUrl: URL | null = null;

    if (redirect === "home") {
      redirectUrl = new URL("https://shadowdara.github.io", request.url);
    } else if (redirect === "github") {
      redirectUrl = new URL("https://github.com/shadowdara", request.url);
    } else if (redirect === "github2") {
      redirectUrl = new URL("https://github.com/weuritz8u", request.url);
    } else {
      do_redirect = false;
    }

    if (do_redirect && redirectUrl) {
      return NextResponse.redirect(redirectUrl.toString(), 302);
    }
  }

  // Absoluter Pfad zur Datei im Projekt (z. B. /public/data/redirection.txt)
  const filePath = path.join(process.cwd(), "public/data/redirection.txt");
  const text = await readFile(filePath, "utf-8");

  return new NextResponse(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

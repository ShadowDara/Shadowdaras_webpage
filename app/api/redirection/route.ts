import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const homepage = "https://shadowdara.vercel.app"

const filePath = path.join(process.cwd(), "public/data/redirection.txt");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") || (searchParams.has("redirect") ? null : searchParams.get("r")) || "yes";

  if (redirect !== "no") {
    let redirectUrl: URL | null = null;

    if (redirect === "home") {
      redirectUrl = new URL("https://shadowdara.github.io", request.url);
    }
    else if (redirect === "github") {
      redirectUrl = new URL("https://github.com/shadowdara", request.url);
    }
    else if (redirect === "github2") {
      redirectUrl = new URL("https://github.com/weuritz8u", request.url);
    }
    else if (redirect === "projects") {
      redirectUrl = new URL("", request.url);
    }

    else if (redirect === "yes") {
      redirectUrl = new URL(homepage, request.url);
    }

    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl.toString(), 302);
    }
  }

  const text = await readFile(filePath, "utf-8");
  return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
  });
}

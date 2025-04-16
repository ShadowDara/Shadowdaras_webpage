import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const homepage = "https://shadowdara.vercel.app"
const filePath = path.join(process.cwd(), "public/data/redirection.txt");
const filePath_html = path.join(process.cwd(), "public/data/redirection.html");

function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const redirect = searchParams.get("redirect") || (searchParams.has("redirect") ? null : searchParams.get("r")) || "yes";

  if (redirect === "yes") {
    const text_html = await readFile(filePath_html, "utf-8");
    return new NextResponse(text_html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  else {
    let do_redirect = true;
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
    else if (redirect === "yes") {
      await wait(10);
      redirectUrl = new URL(homepage, request.url);
    }
    else {
      do_redirect = false;
    }

    if (do_redirect && redirectUrl) {
      return NextResponse.redirect(redirectUrl.toString(), 302);
    }
  }

  const text = await readFile(filePath, "utf-8");

  return new NextResponse(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

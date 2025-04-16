import { NextResponse } from "next/server";

interface Redirecting {
  id: number;
  html_url: string;
  redirect: string | null;
}

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
    } else {
      do_redirect = false;
    }
  
    if (do_redirect && redirectUrl) {
      return NextResponse.redirect(redirectUrl.toString(), 302);
    }
  }
  

  const response = new NextResponse("Redirecting ...\n\nYou should not see this!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response;
}

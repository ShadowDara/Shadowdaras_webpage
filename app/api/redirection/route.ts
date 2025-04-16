import { NextResponse } from "next/server";

interface Repository {
  id: number;
  html_url: string;
  redirect: string | null;
}

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const redirect = searchParams.get("redirect");

  if (redirect === "home") {
    const redirectUrl = new URL("https://shadowdara.github.io", request.url);

    return NextResponse.redirect(redirectUrl.toString(), 302);
  }
  
  const response = new NextResponse("Redirecting ...\n\nYou should not see this!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response;
}

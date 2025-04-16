import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public/data/repo_database/project_list.csv");

export async function GET(request: Request) {
  const text = await readFile(filePath, "utf-8");
    return new NextResponse(text, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
    });
}

// app/api/create-room/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WHEREBY_API_KEY;

  const res = await fetch("https://api.whereby.dev/v1/meetings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      endDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

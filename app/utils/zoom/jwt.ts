// lib/zoom/jwt.ts
import "server-only"; // Ensures this file is only ever bundled for the server
import { KJUR } from "jsrsasign";

export async function getZoomJWT(slug: string) {
  const JWT = await generateSignature(slug, 1);
  return JWT;
}

function generateSignature(sessionName: string, role: number): string {
  if (!process.env.ZOOM_SDK_KEY || !process.env.ZOOM_SDK_SECRET) {
    // It's good practice to provide more specific errors for missing env vars
    // or to ensure they are loaded at startup.
    console.error("Missing ZOOM_SDK_KEY or ZOOM_SDK_SECRET environment variables. Please check your .env file.");
    throw new Error("Zoom SDK credentials are not configured.");
  }

  // Current time minus 30 seconds to account for clock skew
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  // Token expires in 2 hours
  const exp = iat + 60 * 60 * 2;

  const oHeader = {
    alg: "HS256",
    typ: "JWT",
  };

  const sdkKey = process.env.ZOOM_SDK_KEY;
  const sdkSecret = process.env.ZOOM_SDK_SECRET;

  const oPayload = {
    app_key: sdkKey,
    tpc: sessionName, // Topic/Session name
    role_type: role, // 1 for host, 0 for participant
    version: 1,
    iat: iat,
    exp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);

  // KJUR.jws.JWS.sign is a synchronous function
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);

  return sdkJWT;
}
"use client";

import { CSSProperties, useRef, useState, useEffect } from "react";
import ZoomVideo, { type VideoClient, type VideoPlayer, VideoQuality } from "@zoom/videosdk";


export default function Videochat({ slug, JWT }: { slug: string; JWT: string }) {
  const zoomClientRef = useRef<any>(null);

  useEffect(() => {
    const client = ZoomVideo.createClient();
    zoomClientRef.current = client;

    const joinMeeting = async () => {
      await client.init("en-US", "CDN");
      await client.join(JWT, slug, "", "");

      const mediaStream = client.getMediaStream();
      await mediaStream.startVideo();
    };

    joinMeeting();

    return () => {
      zoomClientRef.current?.leave(true);
    };
  }, [JWT, slug]);

  return <div id="zoom-root" className="w-full h-[600px]" />;
}

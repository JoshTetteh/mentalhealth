'use client';

import { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import './zoom.css'; // if you're importing Web SDK CSS

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.3/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

export default function ZoomClient({ meetingNumber, userName, passWord, signature, sdkKey }: any) {
  useEffect(() => {
    ZoomMtg.init({
      leaveUrl: 'http://localhost:3000',
      success: () => {
        ZoomMtg.join({
          meetingNumber,
          userName,
          signature,
          sdkKey,
          passWord,
          success: () => console.log('Joined meeting'),
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });
  }, [meetingNumber, userName, passWord, signature, sdkKey]);

  return <div id="zmmtg-root" />;
}

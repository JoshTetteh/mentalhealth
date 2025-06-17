// ZoomMeeting.tsx
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

interface MeetingConfig {
    apiKey: string;
    meetingNumber: number;
    userName: string;
    passWord?: string; // Password is optional
    userEmail?: string; // Email is optional
    leaveUrl: string;
}

interface SignatureResponse {
    signature: string;
}

const ZoomMeeting: React.FC<{ meetingConfig: MeetingConfig }> = ({ meetingConfig }) => {
    const [sdkReady, setSdkReady] = useState<boolean>(false);
    const zoomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadZoom = async () => {
            try {
                const zoom = await import('@zoomus/websdk');
                (window as any).ZoomMtg = zoom.default; // Important: Assign to window. Cast to 'any' to avoid TS errors with window

                console.log('Zoom Web SDK loaded');

                (window as any).ZoomMtg.preLoadWasm();
                (window as any).ZoomMtg.prepareJssdk();

                setSdkReady(true);
            } catch (error) {
                console.error('Failed to load Zoom Web SDK', error);
            }
        };

        loadZoom();
    }, []);

    useEffect(() => {
        if (sdkReady && meetingConfig) {
            const { apiKey, meetingNumber, userName, passWord, userEmail, leaveUrl } = meetingConfig;

            // Generate Signature (more on this later - important for security!)
            const generateSignature = async (): Promise<string | null> => {
                try {
                    const response = await fetch('/api/zoom/signature', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            meetingNumber: meetingNumber,
                            role: 0, // 0 for attendee, 1 for host
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data: SignatureResponse = await response.json();
                    return data.signature;
                } catch (error) {
                    console.error('Failed to generate signature:', error);
                    return null; // Or handle the error appropriately
                }
            };

            const startMeeting = async () => {
                const signature = await generateSignature();
                if (!signature) {
                    console.error('Failed to get signature');
                    return;
                }
                console.log("signature", signature);
                (window as any).ZoomMtg.init({
                    leaveUrl: leaveUrl,
                    success: (success: any) => { // Use 'any' for the success callback type
                        console.log("init success", success);

                        (window as any).ZoomMtg.join({
                            sdkKey: apiKey,
                            signature: signature,
                            meetingNumber: meetingNumber,
                            userName: userName,
                            passWord: passWord,
                            userEmail: userEmail,
                            success: (success: any) => { // Use 'any' for the success callback type
                                console.log('join meeting success', success);
                            },
                            error: (error: any) => { // Use 'any' for the error callback type
                                console.error('join meeting error', error);
                            }
                        });

                    },
                    error: (error: any) => { // Use 'any' for the error callback type
                        console.error("init error", error)
                    }
                });
            };

            startMeeting();
        }
    }, [sdkReady, meetingConfig]);

    return (
        <div>
            <Head>
                <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.18.0/css/bootstrap.css" />
                <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.18.0/css/react-select.css" />
            </Head>
            {/*  Add the container where Zoom will render the meeting */}
            <div ref={zoomRef} id="zmmtg-root" />
        </div>
    );
};

export default ZoomMeeting;
"use client";

import React, { useEffect } from 'react';
import {
    StreamVideoClient,
    useCall,
    User,
    StreamVideo,
    StreamTheme,
    StreamCall,
    SpeakerLayout,
    CallControls,
} from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css";


const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzQ3MTgyMTkwLCJleHAiOjE3NDc3ODY5OTB9.mP_bT2e7Dzf_GA8vvPBZc9SYCMltb-yrR8gwmy7lPQI';
const userId = 'Zam_Wesell';
const callId = 'h81FA3USDDTY';

const user: User = {
    id: userId,
    name: 'Oliver',
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);

export default function CallPage() { // Renamed for clarity
    useEffect(() => {
        const joinCall = async () => {
            try {
                await call.join({ create: true });
            } catch (error) {
                console.error('Error joining call:', error);
            }
        };

        joinCall();

        return () => {
            call.leave();
        };
    }, []);

    return (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}
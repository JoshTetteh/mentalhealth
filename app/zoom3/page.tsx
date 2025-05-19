"use client";

import React, { useEffect, useState } from 'react';
import {
    StreamVideoClient,
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

async function getRecordings(callId: string) {
    try {
        const result = await call.queryRecordings();
        console.log('Recordings:', result.recordings);
        return result.recordings;
    } catch (error) {
        console.error('Error fetching recordings:', error);
        return []; // Return an empty array in case of an error
    }
}

export default function CallPage() {
    const [recordings, setRecordings] = useState<any[]>([]); // State to store recordings

    useEffect(() => {
        const joinCall = async () => {
            try {
                await call.join({ create: true });
            } catch (error) {
                console.error('Error joining call:', error);
            }
        };

        joinCall();

        // Fetch recordings for the current call
        getRecordings(callId).then(setRecordings);

        return () => {
            call.leave();
        };
    }, [callId]); // Added callId to the dependency array

    return (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />
                    {/* You can render the recordings here if needed */}
                    {recordings.length > 0 && (
                        <div>
                            <h3>Recordings:</h3>
                            <ul>
                                {recordings.map((recording: any) => (
                                    <li key={recording.id}>{recording.id} - Status: {recording.status}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}
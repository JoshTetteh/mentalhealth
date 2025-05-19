"use client";

import React from 'react';

import { CallingState, StreamVideoClient, useCall, useCallStateHooks,  ParticipantView, StreamVideoParticipant } from '@stream-io/video-react-sdk';
import type { User } from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzQ3MTgyMTkwLCJleHAiOjE3NDc3ODY5OTB9.mP_bT2e7Dzf_GA8vvPBZc9SYCMltb-yrR8gwmy7lPQI';
const userId = 'Zam_Wesell';
const callId = 'h81FA3USDDTY';

// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

// Create client and call as a side effect (not inside the component)
const client = new StreamVideoClient({ apiKey, user, token });
// Define the call but don't join it yet - we'll do that inside a useEffect
const call = client.call('default', callId);

export default function App() {
  // Use an effect to join the call when the component mounts
  React.useEffect(() => {
    const joinCall = async () => {
      try {
        await call.join({ create: true });
      } catch (error) {
        console.error('Error joining call:', error);
      }
    };
    
    joinCall();
    
    // Clean up when the component unmounts
    return () => {
      call.leave();
    };
  }, []);

const MyApp = () => {
  // Assuming you have the 'client' and 'call' instance created
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
};
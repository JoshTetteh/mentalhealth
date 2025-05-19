"use client";

import React from 'react';
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, StreamTheme, ParticipantView, StreamVideoParticipant } from '@stream-io/video-react-sdk';
import type { User } from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

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

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
    </StreamTheme>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
  const { participant } = props;
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '320px',
        height: '180px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};
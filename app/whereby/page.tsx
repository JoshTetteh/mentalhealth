'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, AlertCircle, Loader2, ExternalLink } from "lucide-react";

export default function VideoRoom() {
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const createRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('/api/create-room', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.roomUrl) {
          setRoomUrl(data.roomUrl);
        } else {
          throw new Error('No room URL received from server');
        }
      } catch (error) {
        console.error('Error creating room:', error);
        setError(error instanceof Error ? error.message : 'Failed to create room');
      } finally {
        setLoading(false);
      }
    };

    createRoom();
  }, []);

  const handleJoinClick = () => {
    // For Whereby and similar services, direct to new tab instead of iframe
    handleExternalJoin();
  };

  const handleExternalJoin = () => {
    if (roomUrl) {
      window.open(roomUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg">Setting up your video room...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Connection Error</CardTitle>
            <CardDescription>
              We couldn't set up your video room. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showIframe && roomUrl && !iframeError) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Video Conference</h1>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExternalJoin}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowIframe(false)}
            >
              Back to Lobby
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden border bg-card">
          <iframe
            src={roomUrl}
            allow="camera; microphone; fullscreen; speaker; display-capture; compute-pressure"
            style={{ 
              height: 'calc(100vh - 120px)', 
              width: '100%', 
              border: 'none',
              minHeight: '600px'
            }}
            title="Video Conference Room"
            onError={() => setIframeError(true)}
            onLoad={(e) => {
              // Check if iframe content loaded successfully
              try {
                const iframe = e.target as HTMLIFrameElement;
                if (!iframe.contentDocument && !iframe.contentWindow) {
                  setIframeError(true);
                }
              } catch (error) {
                setIframeError(true);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Your Video Session</CardTitle>
          <CardDescription>
            Your room is ready! Choose how you'd like to join the video call.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Video className="h-16 w-16 text-primary" />
          </div>
          
          <div className="space-y-3">
            <p className="text-lg font-medium text-foreground">Ready to join?</p>
            
            <div className="space-y-2">
              <Button 
                onClick={handleJoinClick}
                size="lg" 
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Video Call
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Opens in a new tab for the best experience
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>Please ensure your microphone and camera are enabled in your browser settings.</p>
            <p className="text-xs">Room URL: {roomUrl?.split('/').pop()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
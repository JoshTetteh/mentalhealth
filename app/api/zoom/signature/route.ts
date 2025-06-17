// app/api/zoom/signature/route.ts
import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

interface SignaturePayload {
    meetingNumber: number;
    role: number;
    iat: number;
    exp: number;
}

interface SignatureResponse {
    signature: string;
}

export async function POST(req: NextRequest) {
    try {
        const { meetingNumber, role } = await req.json();

        const payload: SignaturePayload = {
            meetingNumber: meetingNumber,
            role: role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 2)
        };

        const token = jwt.sign(payload, process.env.ZOOM_SDK_SECRET as string);

        return NextResponse.json({ signature: token });
    } catch (error) {
        console.error('Error generating signature:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
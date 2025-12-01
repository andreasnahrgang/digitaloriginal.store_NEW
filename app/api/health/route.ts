import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
        environment: process.env.VERCEL_ENV || 'development'
    });
}

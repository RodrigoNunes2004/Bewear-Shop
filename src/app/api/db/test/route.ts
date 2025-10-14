import { NextResponse } from 'next/server';

import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const result = await testConnection();
    
    if (result.success) {
      return NextResponse.json({
        message: 'Database connection successful',
        data: result.data
      });
    } else {
      return NextResponse.json(
        { 
          message: 'Database connection failed', 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Database connection failed', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

import { createTables } from '@/lib/db';

export async function POST() {
  try {
    const result = await createTables();
    
    if (result.success) {
      return NextResponse.json({
        message: 'Database tables created successfully'
      });
    } else {
      return NextResponse.json(
        { 
          message: 'Failed to create database tables', 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Failed to create database tables', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
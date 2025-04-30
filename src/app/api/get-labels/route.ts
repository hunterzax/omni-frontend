import { NextResponse } from 'next/server';
import axios from 'axios';

const CHATWOOT_BASE_URL = 'https://cw2.i24.dev';

export async function GET(request: Request) {
  try {


    const { searchParams } = new URL(request.url);
    const msgId = searchParams.get('msg-id');
   
    // Perform login with CSRF token
    const response:any =  await axios({
        method: 'get',
        url: `https://cw.i24.dev/api/v1/accounts/1/labels`,
        headers: {
            'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj',
        },
    });

    // Create response with cookies
    const nextResponse = NextResponse.json(response?.data);

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
} 
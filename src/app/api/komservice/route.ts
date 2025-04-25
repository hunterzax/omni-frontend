import { NextResponse } from 'next/server';
import axios from 'axios';

const CHATWOOT_BASE_URL = 'https://cw2.i24.dev';

export async function GET(request: Request) {
  try {
   
    // Perform login with CSRF token
    const loginResponse:any =  await axios({
        method: 'get',
        url: 'https://cw.i24.dev/api/v1/accounts/1/conversations',
        headers: {
            'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj',
        },
    });
    console.log('loginResponse', loginResponse?.data)
   
    // Create response with cookies
    const nextResponse = NextResponse.json(loginResponse?.data);

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
} 
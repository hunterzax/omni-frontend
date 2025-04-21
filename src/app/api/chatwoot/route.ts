import { NextResponse } from 'next/server';

const CHATWOOT_BASE_URL = 'https://cw2.i24.dev';

export async function POST(request: Request) {
  try {
    // First get CSRF token
    const csrfResponse = await fetch(`${CHATWOOT_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
      }
    });

    // Get CSRF token from response headers
    const csrfToken = csrfResponse.headers.get('x-csrf-token');
    const cookies = csrfResponse.headers.get('set-cookie');

    // Perform login with CSRF token
    const loginResponse = await fetch(`${CHATWOOT_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken || '',
        'Cookie': cookies || '',
      },
      body: JSON.stringify({
        user: {
          email: 'tzjeung@gmail.com',
          password: 'Vpkdwxwso@001'
        }
      })
    });

    // Get cookies from login response
    const loginCookies = loginResponse.headers.get('set-cookie');
    const data = await loginResponse.json();

    // Create response with cookies
    const nextResponse = NextResponse.json(data);
    if (loginCookies) {
      nextResponse.headers.set('set-cookie', loginCookies);
    }

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
} 
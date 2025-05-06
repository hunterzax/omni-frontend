// https://cw.i24.dev/api/v1/accounts/1/conversations/20/messages

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = body.params['msg-id'];

        const response:any =  await axios.post(
            // method: 'post',
            `https://cw.i24.dev/api/v1/accounts/1/conversations/${id}/messages`, body.body,
            {headers: {'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj'}},
        );

        console.log(">>> response", response)

        return NextResponse.json({ success: true, message: 'Sent Message Success!', data: response?.data });
    } catch (error) {
        console.error('Error in /api/send-message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// export async function POST(request: Request, bodyx: any) {
//   try {

//     console.log(">>> request.body", request)
//     console.log(">>> bodyx", bodyx)

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     let body = {
//         "content": "ยินดีให้บริการครับ 🙌",
//         "message_type": "outgoing"
//     }

//     console.log(">>> body", body)
   
//     // Perform login with CSRF token
//     const response:any =  await axios.post(
//         // method: 'post',
//         `https://cw.i24.dev/api/v1/accounts/1/conversations/${id}/messages`, body,
//         {headers: {'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj'}},
//     );

//     // Create response with cookies
//     const nextResponse = NextResponse.json(response?.data);

//     return nextResponse;
//   } catch (error) {
//     console.error('Proxy error:', error);
//     return NextResponse.json(
//       { error: 'Failed to authenticate' },
//       { status: 500 }
//     );
//   }
// } 
// lib/chatwoot.ts
import { jwtDecrypt, SignJWT, base64url } from 'jose';
import { CHATWOOT_JWT_SECRET } from '@/utils/supabase/constants';

interface ChatwootUser {
  id: string;
  name: string;
  email: string;
}

export async function generateChatwootToken(user: ChatwootUser): Promise<string> {
  if (!user.email || !user.name) {
    throw new Error('Email and name are required for Chatwoot token generation');
  }

  const payload = {
    identifier: user.email,
    name: user.name,
    email: user.email,
    timestamp: Date.now(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
  };

  const secret = CHATWOOT_JWT_SECRET;
  
  if (!secret) {
    throw new Error('CHATWOOT_JWT_SECRET is not defined');
  }

  try {
    // Convert the secret to a Uint8Array using base64url encoding
    const secretKey = base64url.decode(base64url.encode(secret));

    // Create and sign the JWT
    const token = await new SignJWT(payload)
      .setProtectedHeader({ 
        alg: 'HS256',
        typ: 'JWT'
      })
      .sign(secretKey);

    return token;
  } catch (error) {
    console.error('JWT Sign Error:', error);
    throw new Error('Failed to generate Chatwoot token');
  }
}

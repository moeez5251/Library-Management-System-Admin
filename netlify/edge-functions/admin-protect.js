import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode('062d82ed-260a-4e53-9618-1acef0c55ae0');

export default async (request, context) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = cookieHeader.split('; ').find(c => c.startsWith('jwt='))?.split('=')[1];

  if (!token) {
    return Response.redirect(new URL('/', request.url), 302);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return context.next();
  } catch (e) {
    return Response.redirect(new URL('/', request.url), 302);
  }
};

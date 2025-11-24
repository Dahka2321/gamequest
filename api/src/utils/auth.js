const ADMIN_KEY = process.env.ADMIN_KEY || '';

export function requireAuth(c, next) {
  const apiKey = c.req.header('x-api-key');
  
  if (!apiKey || apiKey !== ADMIN_KEY) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  return next();
}


const rateLimit = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(ip: string, max = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkHoneypot(body: Record<string, unknown>) {
  return !body.website;
}

export function jsonError(message: string, status = 400) {
  return Response.json({ success: false, message }, { status });
}

export function jsonSuccess(message: string) {
  return Response.json({ success: true, message });
}

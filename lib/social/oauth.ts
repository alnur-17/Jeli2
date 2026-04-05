/**
 * OAuth URL builders for TikTok and Instagram.
 * When env vars are empty, the manual fallback is used instead.
 */

export function hasTikTokOAuth(): boolean {
  return Boolean(process.env.TIKTOK_CLIENT_KEY);
}

export function hasInstagramOAuth(): boolean {
  return Boolean(process.env.INSTAGRAM_CLIENT_ID);
}

export function buildTikTokOAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    scope: "user.info.basic,user.info.stats",
    response_type: "code",
    redirect_uri: redirectUri,
    state: crypto.randomUUID(),
  });
  return `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
}

export function buildInstagramOAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID!,
    redirect_uri: redirectUri,
    scope: "instagram_basic,instagram_content_publish",
    response_type: "code",
    state: crypto.randomUUID(),
  });
  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

export async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  const url = 'https://api.dropbox.com/oauth2/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret
    })
  });
  const data = await response.json();
  return data.access_token; // New access token
}

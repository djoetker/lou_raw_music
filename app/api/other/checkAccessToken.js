export async function checkAccessToken() {
  const res = await fetch('/api/dropbox/check-token');
  const data = await res.json();
  return data.valid;
}

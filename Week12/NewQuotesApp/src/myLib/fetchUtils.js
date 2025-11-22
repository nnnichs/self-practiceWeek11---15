async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  return res.json();
}
export { request };

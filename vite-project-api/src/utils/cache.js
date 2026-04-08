const cache = {};

export function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
  sessionStorage.setItem(key, JSON.stringify(cache[key]));
}

export function getCache(key, ttl) {
  const cached = cache[key] || JSON.parse(sessionStorage.getItem(key));
  if (!cached) return null;
  if (Date.now() - cached.timestamp > ttl) return null;
  return cached.data;
}
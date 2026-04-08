const PREFIX = "lab8_cache_";

export function getCachedValue(key, ttlMs) {
  try {
    const raw = sessionStorage.getItem(PREFIX + key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const isExpired = Date.now() - parsed.timestamp > ttlMs;

    if (isExpired) {
      sessionStorage.removeItem(PREFIX + key);
      return null;
    }

    return parsed.value;
  } catch {
    return null;
  }
}

export function setCachedValue(key, value) {
  try {
    const payload = {
      value,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(PREFIX + key, JSON.stringify(payload));
  } catch {
  }
}
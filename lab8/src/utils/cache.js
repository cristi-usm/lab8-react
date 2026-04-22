const TTL_MS = 5 * 60 * 1000; // 5 minutes

const memoryCache = new Map();

export function getCached(key) {
    const entry = memoryCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > TTL_MS) {
        memoryCache.delete(key);
        return null;
    }
    return entry.data;
}

export function setCached(key, data) {
    memoryCache.set(key, { data, timestamp: Date.now() });
}

export function clearCache() {
    memoryCache.clear();
}

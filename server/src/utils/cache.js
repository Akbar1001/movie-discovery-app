 const cache = new Map();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const get = (key) => {
    const cachedItem = cache.get(key);

    if (!cachedItem) {
        return null;
    }

    if (Date.now() > cachedItem.expiresAt) {
        cache.delete(key);
        return null;
    }

    return cachedItem.value;
};

const set = (key, value, ttl = DEFAULT_TTL) => {
    cache.set(key, {
        value,
        expiresAt: Date.now() + ttl,
    });
};

const remove = (key) => {
    cache.delete(key);
};

const clear = () => {
    cache.clear();
};

module.exports = {
    get,
    set,
    remove,
    clear,
};
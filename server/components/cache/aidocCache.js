class Cache {
    constructor(ttl = 30, maxCacheSize = 10) {
        this._ttlMins = ttl;
        this._maxCacheSize = maxCacheSize;

        this._store = new Map();

        setInterval(() => {
            this._store = removeOldItemsFromCacheStore(this._store);
        }, 30 * 1000); //every 30 seconds
    }

    add(id, item) {
        const ttl = newTTL(this._ttlMins); //add minuets to now date
        this._store.set(id, {item, ttl});

        if (this._store.size > this._maxCacheSize) {
            const oldestId = findOldestIdInCacheStore(this._store);
            this._store.delete(oldestId);
        }
    }

    get(id) {
        const itemCache = this._store.get(id);
        if (itemCache) {
            const item = itemCache.item;
            this.add(id, item); //reset ttl
            return item;
        }
        return null;
    }
}

module.exports = Cache;

function newTTL(ttlMins) {
    return new Date().getTime() + ttlMins * 60000;
}

function removeOldItemsFromCacheStore(cacheStore) {
    cacheStore.forEach((itemCache, id) => {
        if (itemCache.ttl < new Date().getTime()) {
            cacheStore.delete(id);
        }
    });
    return cacheStore;
}

function findOldestIdInCacheStore(cacheStore) {
    let oldestId, oldestTTL;

    //do a for loop and not foreach for it to be synchronous
    const iterator = cacheStore[Symbol.iterator]();
    for (let item of iterator) {
        const id = item[0];
        const itemCache = item[1];

        if (!oldestId || !oldestTTL) {
            oldestId = id;
            oldestTTL = itemCache.ttl;
        }
        else {
            if (oldestTTL > itemCache.ttl) {
                oldestTTL = itemCache.ttl;
                oldestId = id;
            }
        }
    }
    return oldestId;
}
// storage/imageCacheDB.js
import { openDB } from "idb";

export const DB_NAME = "blitzImageCache";
export const STORE_NAME = "profile_images";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export const ImageCacheDB = {
  async setItem(key, value) {
    const db = await dbPromise;
    return db.put(STORE_NAME, value, key);
  },

  async getItem(key) {
    const db = await dbPromise;
    return db.get(STORE_NAME, key);
  },

  async getAllKeys() {
    const db = await dbPromise;
    return db.getAllKeys(STORE_NAME);
  },

  async deleteItem(key) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, key);
  },
};

/**
 * Client-Side Durable Video Storage using browser's native IndexedDB API.
 * This helper avoids string-length limitations of localStorage by storing the raw file Blob.
 */

const DB_NAME = "SintomecBgDb";
const STORE_NAME = "bgVideoStore";
const DB_VERSION = 1;
const KEY_NAME = "heroBgBlob";

function initDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

/**
 * Saves a Video Blob to IndexedDB
 */
export async function saveVideoBlob(blob: Blob): Promise<void> {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(transaction.objectStoreNames[0] || STORE_NAME);
    const request = store.put(blob, KEY_NAME);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Retrieves the Video Blob from IndexedDB
 */
export async function getVideoBlob(): Promise<Blob | null> {
  try {
    const db = await initDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(KEY_NAME);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("IndexedDB load error:", error);
    return null;
  }
}

/**
 * Clears the Video Blob from IndexedDB
 */
export async function clearVideoBlob(): Promise<void> {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(KEY_NAME);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// bufferFix.js - Import this at the very top of your main file
import { Buffer } from "buffer";

// Ensure Buffer is globally available
if (typeof globalThis !== "undefined") {
  globalThis.Buffer = Buffer;
}
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

// Fix for the specific error you're encountering
const originalMusigAggregateNonces =
  globalThis.Musig?.prototype?.aggregateNonces;

// Create a helper to ensure all buffers are properly converted
export const ensureProperBuffer = (data) => {
  if (!data) return data;

  // If it's already a proper Buffer, return it
  if (Buffer.isBuffer(data)) return data;

  // If it's a Uint8Array or similar typed array
  if (data instanceof Uint8Array) {
    return Buffer.from(data);
  }

  // If it's an array-like object
  if (typeof data === "object" && data.length !== undefined) {
    return Buffer.from(Array.from(data));
  }

  // If it's a hex string
  if (typeof data === "string") {
    return Buffer.from(data, "hex");
  }

  return data;
};

// Patch the specific function that's causing issues
export const patchMusigMethods = () => {
  // This ensures that any buffer-like objects are converted to proper Buffers
  // before being used in comparisons
  const originalFind = Array.prototype.find;

  // Override Array.find temporarily during critical operations
  const patchedFind = function (predicate, thisArg) {
    return originalFind.call(this, function (element, index, array) {
      // Ensure buffer elements are properly converted
      if (
        element &&
        typeof element === "object" &&
        element.length !== undefined
      ) {
        element = ensureProperBuffer(element);
      }
      return predicate.call(thisArg, element, index, array);
    });
  };

  return {
    patch: () => {
      Array.prototype.find = patchedFind;
    },
    restore: () => {
      Array.prototype.find = originalFind;
    },
  };
};

// Initialize the fix
export const initBufferFix = () => {
  // Ensure Buffer methods are available
  if (!Buffer.prototype.equals) {
    Buffer.prototype.equals = function (other) {
      if (!other) return false;

      const otherBuffer = ensureProperBuffer(other);
      if (this.length !== otherBuffer.length) return false;

      for (let i = 0; i < this.length; i++) {
        if (this[i] !== otherBuffer[i]) return false;
      }
      return true;
    };
  }

  // Patch Buffer.from to handle edge cases
  const originalBufferFrom = Buffer.from;
  Buffer.from = function (data, encoding) {
    if (
      data &&
      typeof data === "object" &&
      data.constructor &&
      data.constructor.name === "Buffer2"
    ) {
      // Convert Buffer2 to proper Buffer
      return originalBufferFrom.call(this, Array.from(data));
    }
    return originalBufferFrom.call(this, data, encoding);
  };
};

// aggressiveBufferFix.js - Import this BEFORE any other imports
import { Buffer } from "buffer";

// Store the original Buffer constructor
const OriginalBuffer = Buffer;

// Create a custom Buffer class that ensures compatibility
class CompatibleBuffer extends OriginalBuffer {
  constructor(...args) {
    super(...args);
  }

  equals(other) {
    if (!other) return false;

    // Convert other to proper buffer if needed
    let otherBuffer = other;
    if (!OriginalBuffer.isBuffer(other)) {
      if (
        other instanceof Uint8Array ||
        (other && typeof other === "object" && other.length !== undefined)
      ) {
        otherBuffer = OriginalBuffer.from(other);
      } else {
        return false;
      }
    }

    if (this.length !== otherBuffer.length) return false;

    for (let i = 0; i < this.length; i++) {
      if (this[i] !== otherBuffer[i]) return false;
    }
    return true;
  }

  static from(data, encoding) {
    if (data && typeof data === "object" && data.constructor) {
      // Handle different buffer-like objects
      if (
        data.constructor.name === "Buffer2" ||
        data.constructor.name === "Uint8Array"
      ) {
        return new CompatibleBuffer(Array.from(data));
      }
    }

    const result = OriginalBuffer.from(data, encoding);
    // Convert to our compatible buffer
    return new CompatibleBuffer(result);
  }

  static isBuffer(obj) {
    return OriginalBuffer.isBuffer(obj) || obj instanceof CompatibleBuffer;
  }
}

// Copy all static methods from original Buffer
Object.getOwnPropertyNames(OriginalBuffer).forEach((name) => {
  if (typeof OriginalBuffer[name] === "function" && !CompatibleBuffer[name]) {
    CompatibleBuffer[name] = OriginalBuffer[name].bind(OriginalBuffer);
  }
});

// Override global Buffer
if (typeof globalThis !== "undefined") {
  globalThis.Buffer = CompatibleBuffer;
}
if (typeof window !== "undefined") {
  window.Buffer = CompatibleBuffer;
}

// Monkey patch Array.prototype.find to handle buffer comparisons better
const originalArrayFind = Array.prototype.find;
Array.prototype.find = function (predicate, thisArg) {
  return originalArrayFind.call(this, function (element, index, array) {
    // If we're dealing with arrays that might contain buffers, normalize them
    if (Array.isArray(element) && element.length === 2) {
      // This looks like the [publicKey, nonce] arrays used in aggregateNonces
      const [key, value] = element;
      if (key && typeof key === "object" && key.length !== undefined) {
        element[0] = CompatibleBuffer.from(key);
      }
      if (value && typeof value === "object" && value.length !== undefined) {
        element[1] = CompatibleBuffer.from(value);
      }
    }
    return predicate.call(thisArg, element, index, array);
  });
};

// Export the buffer for use in your code
export { CompatibleBuffer as Buffer };

export const forceBufferCompatibility = (obj) => {
  if (!obj) return obj;

  if (
    typeof obj === "object" &&
    obj.length !== undefined &&
    !CompatibleBuffer.isBuffer(obj)
  ) {
    return CompatibleBuffer.from(obj);
  }

  return obj;
};

// Function to deeply convert buffer-like objects in complex structures
export const deepBufferConvert = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  if (obj.length !== undefined && !CompatibleBuffer.isBuffer(obj)) {
    return CompatibleBuffer.from(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(deepBufferConvert);
  }

  if (obj.constructor === Object) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepBufferConvert(value);
    }
    return result;
  }

  return obj;
};

console.log("🔧 Aggressive buffer compatibility fix loaded");

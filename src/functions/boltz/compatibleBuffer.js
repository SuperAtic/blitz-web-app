export default function createCompatibleBuffer(input, encoding = "hex") {
  let buffer;

  if (typeof input === "string") {
    buffer = Buffer.from(input, encoding);
  } else if (input instanceof Uint8Array || Array.isArray(input)) {
    buffer = Buffer.from(input);
  } else {
    buffer = Buffer.from(input);
  }

  // Force the buffer to have proper prototype methods
  if (buffer.constructor.name === "Buffer2") {
    console.warn("Buffer2 detected, attempting compatibility fixes...");

    // Ensure .equals method exists and works properly
    if (typeof buffer.equals !== "function") {
      buffer.equals = function (other) {
        if (!Buffer.isBuffer(other)) return false;
        if (this.length !== other.length) return false;
        for (let i = 0; i < this.length; i++) {
          if (this[i] !== other[i]) return false;
        }
        return true;
      };
    }
  }

  return buffer;
}

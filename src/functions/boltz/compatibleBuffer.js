export default function createCompatibleBuffer(input, encoding = "hex") {
  // First ensure the global Buffer is properly polyfilled
  if (typeof window !== "undefined" && !window.Buffer) {
    window.Buffer = Buffer;
  }

  let buffer;

  try {
    if (input instanceof Buffer) {
      return input; // Already a Buffer
    } else if (typeof input === "string") {
      buffer = Buffer.from(
        input,
        /^[0-9a-f]+$/i.test(input) ? "hex" : encoding
      );
    } else if (input instanceof Uint8Array || Array.isArray(input)) {
      buffer = Buffer.from(input);
    } else if (input?.buffer instanceof ArrayBuffer) {
      buffer = Buffer.from(input.buffer);
    } else {
      buffer = Buffer.from(input);
    }
  } catch (e) {
    console.error("Buffer creation failed:", {
      input,
      type: typeof input,
      constructor: input?.constructor?.name,
    });
    throw new Error(`Invalid buffer input: ${e.message}`);
  }

  // Force Buffer prototype consistency
  if (buffer.constructor.name !== "Buffer") {
    const newBuffer = Buffer.alloc(buffer.length);
    buffer.copy(newBuffer);
    buffer = newBuffer;
  }

  // Ensure critical methods exist
  if (typeof buffer.equals !== "function") {
    buffer.equals = function (other) {
      if (!Buffer.isBuffer(other)) return false;
      if (this.length !== other.length) return false;
      return this.compare(other) === 0;
    };
  }

  return buffer;
}

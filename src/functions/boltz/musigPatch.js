// musigPatch.js
import {
  Buffer as CompatibleBuffer,
  forceBufferCompatibility,
} from "./aggressiveBufferFix";

let originalMusigClass = null;

export const patchMusigClass = (MusigClass) => {
  if (originalMusigClass) return; // Already patched

  originalMusigClass = MusigClass;

  // Store original methods
  const originalAggregateNonces = MusigClass.prototype.aggregateNonces;
  const originalAddPartial = MusigClass.prototype.addPartial;
  const originalGetPublicNonce = MusigClass.prototype.getPublicNonce;

  // Patch aggregateNonces - this is where the error occurs
  MusigClass.prototype.aggregateNonces = function (nonces) {
    console.log("🔧 Patched aggregateNonces called", nonces);

    // Convert all nonces to compatible buffers
    const convertedNonces = nonces.map(([publicKey, nonce]) => {
      const convertedKey = forceBufferCompatibility(publicKey);
      const convertedNonce = forceBufferCompatibility(nonce);

      console.log("🔧 Converting nonce pair:", {
        originalKey: publicKey?.constructor?.name,
        convertedKey: convertedKey?.constructor?.name,
        originalNonce: nonce?.constructor?.name,
        convertedNonce: convertedNonce?.constructor?.name,
      });

      return [convertedKey, convertedNonce];
    });

    // Call original method with converted nonces
    return originalAggregateNonces.call(this, convertedNonces);
  };

  // Patch addPartial to ensure buffer compatibility
  MusigClass.prototype.addPartial = function (publicKey, partialSignature) {
    console.log("🔧 Patched addPartial called");
    return originalAddPartial.call(
      this,
      forceBufferCompatibility(publicKey),
      forceBufferCompatibility(partialSignature)
    );
  };

  // Patch getPublicNonce to ensure it returns a compatible buffer
  MusigClass.prototype.getPublicNonce = function () {
    const result = originalGetPublicNonce.call(this);
    return forceBufferCompatibility(result);
  };

  console.log("🔧 Musig class patched successfully");
};

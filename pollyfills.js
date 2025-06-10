if (Buffer.prototype.constructor.name === "Buffer2") {
  const originalEquals = Buffer.prototype.equals;
  Buffer.prototype.equals = function (other) {
    if (!other || typeof other !== "object") return false;
    if (this.length !== other.length) return false;
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== other[i]) return false;
    }
    return true;
  };
}

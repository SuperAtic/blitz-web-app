const Storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error saving to localStorage", err);
    }
  },

  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error("Error reading from localStorage", err);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Error removing from localStorage", err);
    }
  },

  removeAllItems: () => {
    try {
      const numberOfItems = localStorage.length;
      for (let index = 0; index < numberOfItems; index++) {
        const keyName = localStorage.key(index);
        Storage.removeItem(keyName);
      }
    } catch (err) {
      console.error("Error removing from localStorage", err);
    }
  },
};

export default Storage;

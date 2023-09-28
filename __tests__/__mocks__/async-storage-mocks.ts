// __mocks__/async-storage-mocks.js

export const getItem = jest.fn();
export const setItem = jest.fn();
export const removeItem = jest.fn();
export const clear = jest.fn();

const AsyncStorage = {
  getItem,
  setItem,
  removeItem,
  clear,
};

export default AsyncStorage;

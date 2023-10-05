// __mocks__/rn-fetch-blob.js

const RNFetchBlob = {
  fetch: jest.fn(),
  // Add any other functions or properties you use from rn-fetch-blob
  // For example, fs, wrap, etc.
  fs: {
    // Mock the functions of fs if needed
    writeFile: jest.fn(),
    // Add mock implementations for other fs functions
  },
};

export default RNFetchBlob;

// __mocks__/rn-fetch-blob.js

const RNFetchBlob = {
  fetch: jest.fn(() => Promise.resolve({data: 'mocked response'})),
  // Add other methods you need to mock here
};

export default RNFetchBlob;

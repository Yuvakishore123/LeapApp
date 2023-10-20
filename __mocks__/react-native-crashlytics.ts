export const setCrashlyticsCollectionEnabled = jest.fn();

const crashlytics = () => ({
  setCrashlyticsCollectionEnabled,
});

export default crashlytics;

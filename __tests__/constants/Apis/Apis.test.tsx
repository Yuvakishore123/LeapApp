import {
  url,
  FilterProduct,
  pieChartUrl,
  categoriesData,
  exportPdf,
  categoriyPiechart,
  Dashboardyearlydata,
  profileUpload,
  DeviceTokenURL,
} from '../../../src/constants/Apis';

describe('APIs', () => {
  it('should have the correct value for "url"', () => {
    expect(url).toEqual('https://c540-180-151-122-199.ngrok-free.app/api/v1');
  });
  it('should have the correct value for "FilterProduct"', () => {
    expect(FilterProduct).toEqual(`${url}/product/filterProducts`);
  });

  it('should have the correct value for "pieChartUrl"', () => {
    expect(pieChartUrl).toEqual(`${url}/dashboard/subcategories-analytics`);
  });

  it('should have the correct value for "categoriesData"', () => {
    expect(categoriesData).toEqual(`${url}/subcategory/list`);
  });

  it('should have the correct value for "exportPdf"', () => {
    expect(exportPdf).toEqual(`${url}/order/exportPdf`);
  });

  it('should have the correct value for "categoriyPiechart"', () => {
    expect(categoriyPiechart).toEqual(`${url}/dashboard/categories-analytics`);
  });

  it('should have the correct value for "Dashboardyearlydata"', () => {
    expect(Dashboardyearlydata).toEqual(`${url}/dashboard/analytics-yearly`);
  });

  it('should have the correct value for "profileUpload"', () => {
    expect(profileUpload).toEqual(
      `${url}/user/updateProfilePicture?profileImageUrl`,
    );
  });
  it('should have the correct value for "DeviceToken"', () => {
    expect(DeviceTokenURL).toEqual(`${url}/user/devicetoken`);
  });
});

// Base URL for the API
export const url = 'https://ebd3-106-51-70-135.ngrok-free.app/api/v1';

// URL to get monthly order items for the dashboard
export const getdashboard = `${url}/dashboard/monthly-order-items`;

// URL to filter products
export const FilterProduct = `${url}/product/filterProducts`;

// URL for pie chart data related to subcategories analytics
export const pieChartUrl = `${url}/dashboard/subcategories-analytics`;

// URL to get categories data
export const categoriesData = `${url}/subcategory/list`;

// URL for exporting PDF
export const exportPdf = `${url}/order/exportPdf`;

// URL for pie chart data related to categories analytics
export const categoriyPiechart = `${url}/dashboard/categories-analytics`;

// URL to get yearly analytics data for the dashboard
export const Dashboardyearlydata = `${url}/dashboard/analytics-yearly`;

// URL to upload user profile picture
export const profileUpload = `${url}/user/updateProfilePicture?profileImageUrl`;

// URL for handling device token updates
export const DeviceTokenURL = `${url}/user/devicetoken`;

// URL to get rental products for owner and their shipping status
export const OwnerrentalproductsURL = `${url}/order/shipping-status`;

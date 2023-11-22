// Base URL for API requests
export const url = 'https://325b-106-51-70-135.ngrok-free.app/api/v1';

// URL for fetching monthly order items for the dashboard
export const getdashboard = `${url}/dashboard/monthly-order-items`;

// URL for filtering products based on criteria
export const FilterProduct = `${url}/product/filterProducts`;

// URL for fetching subcategories analytics for a pie chart
export const pieChartUrl = `${url}/dashboard/subcategories-analytics`;

// URL for fetching data about product categories
export const categoriesData = `${url}/subcategory`;

// URL for exporting PDF documents related to orders
export const exportPdf = `${url}/order/exportPdf`;

// URL for fetching analytics data for product categories in a pie chart
export const categoriyPiechart = `${url}/dashboard/categories-analytics`;

// URL for fetching yearly analytics data for the dashboard
export const Dashboardyearlydata = `${url}/dashboard/analytics-yearly`;

// URL for uploading a user's profile picture
export const profileUpload = `${url}/user/updateProfilePicture?profileImageUrl`;

// URL for updating a user's device token
export const DeviceTokenURL = `${url}/user/devicetoken`;

// URL for fetching the shipping status of products owned by the user (owner)
export const OwnerrentalproductsURL = `${url}/order/shipping-status`;

// URL for user signup
export const signupUrl = 'user/signup';

// URL for removing a product from wishlist, requires productId as a query parameter
export const wishListRemoveUrl = '/wishlist/remove?productId=';

// URL for fetching category data
export const categoryDataUrl = '/category';

// URL for removing a product from cart, requires productId as a parameter
export const cartRemoveUrl = '/cart';

// URL for fetching the list of products in the cart
export const cartList = '/cart';

// URL for updating the quantity of a product in the cart
export const cartupdateUrl = '/cart/updateQuantity';

// URL for fetching the list of user addresses
export const listAddressUrl = '/address';

// URL for fetching user profile data
export const profileDataUrl = '/user/getUser';

// URL for updating user profile
export const updateProfileUrl = '/user/update';

// URL for fetching sub-category data by categoryId
export const subCategoryUrl = '/subcategory';

// URL for adding a product to the cart
export const cartaddUrl = '/cart';

// URL for adding a new product
export const productaddUrl = '/product';

// URL for adding a new address
export const addressaddUrl = '/address/add';

// URL for fetching a list of products owned by the user
export const userProductsUrl = '/product';

// URL for fetching a list of products by sub-category id
export const categoryProductsUrl = '/product/listBySubcategoryId';

// URL for fetching the list of products for editing by the owner
export const editItemsDataUrl = '/product/listOwnerProducts';

// URL for fetching products by productId for editing
export const editProductsByIdUrl = '/product/listByProductId';

// URL for disabling a product, requires productId as a query parameter
export const disableProductUrl = '/product/disableProduct?productId=';

// URL for enabling a product, requires productId as a query parameter
export const enableProductUrl = '/product/enableProduct?productId=';

// URL for fetching recently added products
export const recentyAddedUrl = '/product';

// URL for fetching the list of sub-categories
export const subCategoryList = '/subcategory';

// URL for generating an invoice for an order
export const generateInvoice = '/order/generate';

// URL for fetching the owner's order history
export const rentedProductsUrl = 'order/owner-history';

// URL for clicking on the dashboard in the analytics section
export const onclickDasboardUrl = '/dashboard/analytics';

// URL for fetching products by productId
export const listProductsById = '/product/listByProductId';

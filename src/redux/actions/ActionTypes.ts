// Auth Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // Request to initiate login
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Successful login
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // Failed login

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'; // Request to initiate signup
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'; // Successful signup
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'; // Failed signup

export const OTP_REQUEST = 'OTP_REQUEST'; // Request to send OTP
export const OTP_SUCCESS = 'OTP_SUCCESS'; // OTP sent successfully
export const OTP_FAILURE = 'OTP_FAILURE'; // Failed to send OTP

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST'; // Request to verify OTP
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS'; // OTP verification successful
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE'; // Failed OTP verification

// Address Actions
export const ADD_ADDRESS = 'ADD_ADDRESS'; // Add a new address
export const DELETE_ADDRESS = 'DELETE_ADDRESS'; // Delete an address
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS'; // Remove an address

// User Profile Actions
export const ADD_NAME = 'ADD_NAME'; // Add user's name
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION'; // Add user's description
export const ADD_GENDER = 'ADD_GENDER'; // Add user's gender
export const ADD_EVENT = 'ADD_EVENT'; // Add user's event
export const ADD_SIZE = 'ADD_SIZE'; // Add user's size
export const ADD_TYPE = 'ADD_TYPE'; // Add user's type
export const ADD_OUTFIT = 'ADD_OUTFIT'; // Add user's outfit
export const SET_ROLE = 'SET_ROLE'; // Set user's role

// Order Actions
export const ADD_ORDER = 'ADD_ORDER'; // Add a new order

// Cart Actions
export const ADD_TO_CART = 'ADD_TO_CART'; // Add item to cart
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; // Remove item from cart
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'; // Remove product from cart

// Wishlist Actions
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'; // Add item to wishlist
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'; // Remove item from wishlist

// Store Actions
export const ADD_PRODUCT_TO_CART_STORE = 'ADD_PRODUCT_TO_CART_STORE'; // Add product to cart store

// Data Actions
export const ADD_ITEMSDATA = 'ADD_ITEMSDATA'; // Add data for items

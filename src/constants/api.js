// Products

export const PRODUCTS_LIST_API = '/products/get-list/';
export const ORDERS_DETAIL_API = '/products/%d/view-details/';
export const PRODUCT_CREATE_API = '/products/product-create/';
export const PRODUCT_UPDATE_API = '/products/product-update/%d/';
export const PRODUCT_DELETE_API = '/products/product-delete/%d/';

// Orders
const ADS = 'ads';
export const ADS_LIST_API = `/${ADS}/get-list/`;

// Main
const MAIN = 'main';
export const IMAGE_UPLOAD = `/upload/${MAIN}/image-upload/`;
export const IMAGE_DELETE = '/public/delete/images/%s/';

export const COUNTRIES_LIST = '/fields/get-countries/';
export const CITIES_LIST = '/fields/get-cities/%s/';
export const STATES_LIST = '/fields/get-states/%s/';

// Views
export const VISITORS_API = '/views/detail-views/%s/';

// Cashbacks
const CASHBACK = 'cashback';
export const CASHBACKS_LIST = `/${CASHBACK}/get-cashbacks/`;

// Tags List
const TAGS = 'tags';
export const TAGS_LIST_API = `/${TAGS}/get-list/`;

// Category
const CATEGORIES = 'categories';
export const CATEGORIES_LIST_API = `/${CATEGORIES}/%s/get-list/`;

// Auth
const AUTH = 'auth';
export const SING_IN_API = `/${AUTH}/sign-in/`;
export const SETTINGS_API = `/${AUTH}/user-settings/`;
export const AUTH_API = `/${AUTH}/`;
export const SING_UP_API = `/${AUTH}/sign-up/`;
export const COMPLETE_SING_UP_API = `/${AUTH}/complete/sign-up/`;

// Messages
const CHATS = 'chats';
const MESSAGES = 'messages';
export const CHATS_CREATE = `/${CHATS}/create-item/`;

// User
const USER = 'user';
export const USER_DETAILS_API = `/${USER}/%d/view-details/`;
export const USER_PRODUCTS_API = `/${USER}/%d/get-products/`;

// Followers
export const FOLLOWERS_LIST = '/followers/get-list/';
export const FOLLOWINGS_LIST = '/followers/followings-list/';
export const FOLLOW_CREATE = '/followers/create-item/';
export const FOLLOW_DELETE = '/followers/delete-item/%d/';

// Social Accounts
export const TELEGRAM_USER_URL = 'https://t.me/%s/';
export const INSTAGRAM_USER_URL = 'https://instagram.com/%s/';
export const FACEBOOK_USER_URL = 'https://facebook.com/%s/';
export const TWITTER_USER_URL = 'https://twitter.com/%s/';

// Recommendation
const RECOMMENDATION = 'recommendation'
export const PRODUCT_RECOMMENDATION = `/products/${RECOMMENDATION}/`
export const PRODUCT_RECOMMENDATION_AUTHOR = `/products/${RECOMMENDATION}/by-author/`

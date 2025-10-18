export const ROOT_PATH = '/';

const MAIN = '/';
export const MAIN_PATH = `${MAIN}`;
export const MAIN_URL = `${MAIN}`;
// Category
export const CATEGORY = 'category';
export const CATEGORY_URL = `/${CATEGORY}/%s/`;
export const CATEGORY_PATH = `/${CATEGORY}/:categoryId/`;

// Category Types
export const CATEGORY_REAL_ESTATE = 'real-estate';
export const CATEGORY_TRANSPORT = 'transport';
export const CATEGORY_WORKPLACE = 'workplace';
export const CATEGORY_PETS = 'pets';
export const CATEGORY_SPORT = 'sport';
export const CATEGORY_CLOTHES = 'clothes';
export const CATEGORY_SERVICES = 'services';
export const CATEGORY_BABY = 'baby';
export const CATEGORY_ELECTRIC_TOOLS = 'electric-tools';
export const CATEGORY_FOODS = 'foods';
export const CATEGORY_BUILDING_MATERIALS = 'building-materials';
export const CATEGORY_FURNITURE = 'furniture';

// Product
const PRODUCT = 'product';
export const PRODUCT_DETAIL_URL = `/%s/%d/${PRODUCT}/%d`;
export const PRODUCT_DETAIL_PATH = `/:category/:author/${PRODUCT}/:productId/`;

// Messages
const MESSAGES = 'messages';
export const MESSAGES_URL = `/${MESSAGES}/`;
export const MESSAGES_PATH = `/${MESSAGES}/`;
// Detail
export const MESSAGE_DETAIL_URl = `/${MESSAGES}/%d/`;
export const MESSAGE_DETAIL_PATH = `/${MESSAGES}/:chatId/`;

// Favourites
const FAVOURITES = 'favourites';
export const FAVOURITES_URL = `/${FAVOURITES}/`;
export const FAVOURITES_PATH = `/${FAVOURITES}/`;

// Profile
const PROFILE = 'profile';
export const PROFILE_URL = `/${PROFILE}/`;
export const PROFILE_PATH = `/${PROFILE}/`;

// Forum
const FORUM = 'forum';
export const FORUM_URL = `/${FORUM}/`;
export const FORUM_PATH = `/${FORUM}/`;

// For Business
const FOR_BUSINESS = 'for-business';
export const FOR_BUSINESS_URL = `/${FOR_BUSINESS}/`;
export const FOR_BUSINESS_PATH = `/${FOR_BUSINESS}/`;

// Profile
const CASHBACK = 'cashback';
export const CASHBACK_URL = `/${CASHBACK}/`;
export const CASHBACK_PATH = `/${CASHBACK}/`;

// Profile
const CONTACT = 'contact';
export const CONTACT_URL = `/${CONTACT}/`;
export const CONTACT_PATH = `/${CONTACT}/`;

// ADS
const ADS = 'ads-create';
export const ADS_PATH = `/${ADS}/`;
export const ADS_URL = `/${ADS}/`;

// Basket
const BASKET = 'basket';
export const BASKET_PATH = `/${BASKET}/`;
export const BASKET_URL = `/${BASKET}/`;

// Update ads
const UPDATE_ADS = 'update-ads';
export const UPDATE_ADS_URL = `/${UPDATE_ADS}/%s/`;
export const UPDATE_ADS_PATH = `/${UPDATE_ADS}/:productId/`;

// Login
const LOGIN = 'login';
export const LOGIN_PATH = `/${LOGIN}/`;
export const LOGIN_URL = `/${LOGIN}/`;

// Register
const REGISTER = 'register';
export const REGISTER_PATH = `/${REGISTER}/`;
export const REGISTER_URL = `/${REGISTER}/`;

// User
const USER = 'user';
export const USER_DETAILS_URL = `/${USER}/%s/`;
export const USER_DETAILS_PATH = `/${USER}/:user/`;

// Complete sign up
const COMPLETE_SIGN_UP = 'complete-signup';
export const COMPLETE_SIGN_UP_URL = `/${COMPLETE_SIGN_UP}/`;
export const COMPLETE_SIGN_UP_PATH = `/${COMPLETE_SIGN_UP}/`;

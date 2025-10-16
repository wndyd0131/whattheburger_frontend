const now = new Date();
export const ACCESS_TOKEN_EXPIRATION_TIME = new Date(now.getTime() + 1000 * 60 * 30);
export const REFRESH_TOKEN_EXPIRATION_TIME = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
export const ORDER_TYPE_EXPIRATION_TIME = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
export const STORE_ID_EXPIRATION_TIME = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
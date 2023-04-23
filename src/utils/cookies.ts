import Cookies from 'js-cookie';

// User
const tokenKey = 'token';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);

const userIdKey = 'userId';
export const getUserId = () => Cookies.get(userIdKey);
export const setUserId = (token: string) => Cookies.set(userIdKey, token);
export const removeUserId = () => Cookies.remove(userIdKey);

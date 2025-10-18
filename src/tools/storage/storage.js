import {LANGUAGE, TOKEN_KEY, USER_GROUPS} from 'constants/storage';

export const getStorage = (local) => (local ? localStorage : sessionStorage);

export const setToken = (token) => {
	const storage = getStorage(true);
	const session = getStorage(false);

	storage.setItem(TOKEN_KEY, token);
	session.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

export const setUser = (userData, local = true) => {
	const storage = getStorage(local);
	storage.setItem(USER_GROUPS, JSON.stringify(userData));
};

export const getUserData = () => JSON.parse(localStorage.getItem(USER_GROUPS)) || JSON.parse(sessionStorage.getItem(USER_GROUPS));

export const getValue = (key) => localStorage.getItem(key) || sessionStorage.getItem(key);

export const setLanguage = (language, local = false) => {
	const storage = getStorage(local);
	storage.setItem(LANGUAGE, language);
};

export const getLanguage = () => localStorage.getItem(LANGUAGE) || 'ru';

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_GROUPS);
	sessionStorage.removeItem(USER_GROUPS);
};

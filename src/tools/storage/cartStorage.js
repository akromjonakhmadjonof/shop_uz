import * as STATE from 'constants/stateNames';
import {
	assoc,
	clone,
	filter,
	find,
	ifElse,
	lt,
	map,
	not,
	pipe,
	prepend,
	prop,
	propEq,
	propSatisfies,
	when,
} from 'ramda';
import * as actionTypes from 'store/actionTypes';
import {getStorage} from './storage';

export const getCart = () => {
	if (typeof (window) !== 'undefined') {
		return JSON.parse(localStorage.getItem(STATE.CART)) || [];
	}
	return [];
};

export const getFavourites = () => {
	if (typeof (window) !== 'undefined') {
		return JSON.parse(localStorage.getItem(STATE.FAVOURITES)) || [];
	}
	return [];
};

export const setToCart = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(STATE.CART, JSON.stringify(products));
};

export const removeFromCart = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(STATE.CART, JSON.stringify(products));
};

export const setToFavourites = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(STATE.FAVOURITES, JSON.stringify(products));
};

export const setItemToCart = (amount, product, snackbar) => {
	const items = getCart();
	const id = prop('id', product);
	const alter = map(
		when(
			propEq('id', id),
			assoc('amount', amount),
		),
	);
	const clonedObj = pipe(
		clone,
		assoc('amount', amount),
	)(product);

	const formedList = pipe(
		ifElse(
			pipe(find(propEq('id', id)), not),
			prepend(clonedObj),
			alter,
		),
		filter(
			propSatisfies(lt(STATE.ZERO), 'amount'),
		),
	)(items);
	setToCart(JSON.stringify(formedList));
	return (dispatch, getState) => {
		dispatch({
			type:snackbar ? actionTypes.SNACKBAR_OPEN : actionTypes.SNACKBAR_CLOSE,
		});
		return (dispatch) => dispatch({
			type:actionTypes.CART_CHANGE_LIST,
			payload:{data:formedList},
		});
	};
};

export const removeFromFavourites = () => {

};

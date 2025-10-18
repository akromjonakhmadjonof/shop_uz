import {getStorage} from 'tools/storage/storage';
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

const CART = 'cart';
const FAVOURITES = 'favourites';
const ZERO = 0;

export const getCart = () => {
	if (typeof (window) !== 'undefined') {
		return JSON.parse(localStorage.getItem(CART)) || [];
	}
	return [];
};

export const setToCart = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(CART, products);
};

export const setToFavourites = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(FAVOURITES, products);
};

export const removeFromCart = (products, local = true) => {
	const storage = getStorage(local);
	storage.setItem(CART, products);
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
			propSatisfies(lt(ZERO), 'amount'),
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

export const removeItemFrom = (id) => {
	const items = getCart();
	const formedList = filter(pipe(propEq('id', id), not))(items);
	removeFromCart(JSON.stringify(formedList));

	return {
		type:actionTypes.CART_CHANGE_LIST,
		payload:{data:formedList},
	};
};

export const cartClear = () => ({
	type:actionTypes.CART_CHANGE_LIST,
	payload:{data:[]},
});

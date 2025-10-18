import {path, propOr} from 'ramda';
import {removeItemFrom, setItemToCart} from 'tools/storage/cart';
import {socket} from 'App';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import {t} from 'i18next';

export const getProductIncrementAmount = (product) => {
	const measurement = path(['measurement', 'name'], product);
	const measurementName = propOr('', 'name', measurement).toLowerCase();
	const isCustomWeight = ['кг', 'kg'].includes(measurementName);

	return isCustomWeight ? 0.2 : 1;
};

export const useCart = (dispatch) => {
	const handleAdd = (product) => {
		const id = _.get(product, ['id']);
		socket.emit('add_basket', id);
	};

	const handleIncrement = (product, amount) => {
		const incrementAmount = getProductIncrementAmount(product);
		const currentAmount = (Number(amount) + Number(incrementAmount)).toFixed(1);
		return dispatch(setItemToCart(currentAmount, product, false));
	};

	const handleDecrement = (product, value) => {
		const incrementAmount = getProductIncrementAmount(product);
		const amount = (Number(value) - Number(incrementAmount)).toFixed(1);
		return dispatch(setItemToCart(amount, product, false));
	};

	const handleDelete = (productId) => {
		return socket.emit('remove_basket', productId);
	};

	const handleAddFavourites = (product) => {
		const id = _.get(product, ['id']);
		socket.emit('add_favourites', id);
		return (dispatch) => {
			dispatch({
				type:actionTypes.SNACKBAR_OPEN,
				payload:{
					message:t('successful_removed_from_favourites'),
				},
			});
			return (dispatch) => dispatch({
				type:actionTypes.FAVOURITES_LIST_CHANGE,
			});
		};
	};

	const handleRemoveFavourites = (product) => {
		const id = _.get(product, ['id']);
		socket.emit('remove_favourites', id);
		return (dispatch) => {
			dispatch({
				type:actionTypes.SNACKBAR_OPEN,
				payload:{
					message:t('successful_removed_from_favourites'),
				},
			});
			return (dispatch) => dispatch({
				type:actionTypes.FAVOURITES_LIST_CHANGE,
			});
		};
	};

	return {
		handleAdd,
		handleRemoveFavourites,
		handleDelete,
		handleAddFavourites,
		handleIncrement,
		handleDecrement,
	};
};

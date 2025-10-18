import {getStorage} from 'tools/storage/storage';
import * as actionTypes from './actionTypes';

// Bask Reducer
const products = getStorage(true).getItem('bask') || [];

export const cartReducer = (state = products, action) => {
	switch (action.type) {
	case actionTypes.ADD_PRODUCT_TO_BASK:
		return action.payload;
	default:
		return state;
	}
};

// Snackbar Reducer
const defaultState = {
	open:false,
	type:'success',
	message:'Успешно!',
	autoHideDuration:2000,
};

const snackbarReducer = (state = defaultState, action) => {
	switch (action.type) {
	case actionTypes.SNACKBAR_OPEN: {
		return {
			...state,
			...action.payload,
			open:true,
		};
	}
	case actionTypes.SNACKBAR_CLOSE: {
		return {
			...state,
			...action.payload,
			open:false,
		};
	}
	default:
		return state;
	}
};

export default snackbarReducer;

// Dialog reducer
const dialogDefaultState = {
	open:false,
	title:'confirm',
	description:'confirm_text',
};

export const dialogReducer = (state = dialogDefaultState, action) => {
	switch (action.type) {
	case actionTypes.DIALOG_OPEN: {
		return {
			...state,
			...action.payload,
			open:true,
		};
	}
	case actionTypes.DIALOG_CLOSE: {
		return {
			...state,
			...action.payload,
			open:false,
		};
	}
	default:
		return state;
	}
};

// Error dialog reducer
const errorDialogDefaultState = {
	open:false,
	title:'error',
	data:[],
};

export const errorDialogReducer = (state = errorDialogDefaultState, action) => {
	switch (action.type) {
	case actionTypes.ERROR_DIALOG_OPEN: {
		return {
			...state,
			data:action.payload,
			open:true,
		};
	}
	case actionTypes.ERROR_DIALOG_CLOSE: {
		return {
			...state,
			open:false,
		};
	}
	default:
		return state;
	}
};

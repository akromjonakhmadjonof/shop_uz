import * as actionTypes from 'store/actionTypes';

export const openSnackbarAction = (payload) => ({
	type:actionTypes.SNACKBAR_OPEN,
	payload,
});

export const closeSnackbarAction = () => ({
	type:actionTypes.SNACKBAR_CLOSE,
});

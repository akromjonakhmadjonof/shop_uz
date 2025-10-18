import * as actionTypes from 'store/actionTypes';

export const dialogOpen = (payload) => ({
	type:actionTypes.DIALOG_OPEN,
	payload,
});
export const dialogClose = (payload) => ({
	type:actionTypes.DIALOG_CLOSE,
	payload,
});
export const errorDialogOpen = (payload) => ({
	type:actionTypes.ERROR_DIALOG_OPEN,
	payload,
});
export const errorDialogClose = (payload) => ({
	type:actionTypes.ERROR_DIALOG_CLOSE,
	payload,
});

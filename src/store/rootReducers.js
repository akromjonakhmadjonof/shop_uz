import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import createThunkReducer from 'tools/createThunkReducer';
import {reducer as formReducer} from 'redux-form';
import snackbarReducer, {dialogReducer, errorDialogReducer} from './reducers';
import * as STATE from './state';
import * as actionTypes from './actionTypes';

export default combineReducers({
	[STATE.ROUTING]:routerReducer,
	[STATE.HOME_LIST]:createThunkReducer(actionTypes.PRODUCTS_LIST_FETCH_ACTION),
	[STATE.ORDERS_LIST]:createThunkReducer(actionTypes.USER_ADS_LIST_FETCH),
	[STATE.ORDERS_DETAIL]:createThunkReducer(actionTypes.ORDERS_DETAIL_FETCH_ACTION),
	[STATE.SETTINGS]:createThunkReducer(actionTypes.USER_SETTINGS),
	[STATE.CASHBACKS]:createThunkReducer(actionTypes.CASHBACKS_LIST_FETCH_ACTION),
	[STATE.DETAIL_VISITORS]:createThunkReducer(actionTypes.VISITORS_FETCH_ACTION),
	[STATE.TAGS_LIST]:createThunkReducer(actionTypes.TAGS_LIST_FETCH_ACTION),
	[STATE.CATEGORY]:createThunkReducer(actionTypes.FETCH_BY_CATEGORY),
	[STATE.AUTH]:createThunkReducer(actionTypes.USER_AUTH),
	fields:combineReducers({
		[STATE.COUNTRIES]:createThunkReducer(actionTypes.COUNTRIES_LIST_FETCH_ACTION),
		[STATE.CITIES]:createThunkReducer(actionTypes.CITIES_LIST_FETCH_ACTION),
		[STATE.STATES]:createThunkReducer(actionTypes.STATES_LIST_FETCH_ACTION),
	}),

	[STATE.USER_DETAILS]: combineReducers({
		[STATE.INFO]: createThunkReducer(actionTypes.USER_DETAILS_FETCH),
		[STATE.FOLLOWERS]: createThunkReducer(actionTypes.FOLLOWERS_LIST_FETCH),
		[STATE.PRODUCTS]: createThunkReducer(actionTypes.USER_PRODUCTS_FETCH),
		[STATE.FOLLOW_CREATE]: createThunkReducer(actionTypes.FOLLOW_CREATE),
		[STATE.FOLLOWINGS]: createThunkReducer(actionTypes.FOLLOWINGS_LIST_FETCH)
	}),

	[STATE.PRODUCT]: combineReducers({
		[STATE.CREATE]: createThunkReducer(actionTypes.PRODUCT_CREATE_ACTION),
		[STATE.RECOMMENDATION]: createThunkReducer(actionTypes.PRODUCT_RECOMMENDATION),
		[STATE.RECOMMENDATION_BY_AUTHOR]: createThunkReducer(actionTypes.PRODUCT_RECOMMENDATION_AUTHOR)
	}),

	[STATE.MESSAGES]:combineReducers({
		[STATE.MESSAGES]:createThunkReducer(actionTypes.MESSAGES_LIST_FETCH),
	}),
	// Custom Reducers
	snackbar:snackbarReducer,
	dialog:dialogReducer,
	error:errorDialogReducer,
	form:formReducer,
});

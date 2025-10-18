import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import sprintf from 'sprintf';

export const countriesListFetchAction = () => {
	// Payload
	const payload = axios()
		.get(API.COUNTRIES_LIST).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.COUNTRIES_LIST_FETCH_ACTION,
		payload,
	};
};

export const citiesListFetchAction = (country) => {
	// Payload
	const payload = axios()
		.get(sprintf(API.CITIES_LIST, country)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.CITIES_LIST_FETCH_ACTION,
		payload,
	};
};

export const statesListFetchAction = (city) => {
	// Payload
	const payload = axios()
		.get(sprintf(API.STATES_LIST, city)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.STATES_LIST_FETCH_ACTION,
		payload,
	};
};

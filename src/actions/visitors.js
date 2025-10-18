import axios from 'tools/axios';
import sprintf from 'sprintf';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';

export const visitorsAction = (id) => {
	// Payload
	const payload = axios()
		.get(sprintf(API.VISITORS_API, id)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.VISITORS_FETCH_ACTION,
		payload,
	};
};

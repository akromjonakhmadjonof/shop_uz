import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';

export const cashbackListFetchAction = () => {
	// Payload
	const payload = axios()
		.get(API.CASHBACKS_LIST).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.CASHBACKS_LIST_FETCH_ACTION,
		payload,
	};
};

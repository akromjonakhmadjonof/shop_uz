import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';

export const tagsListFetchAction = () => {
	// Payload
	const payload = axios()
		.get(API.TAGS_LIST_API).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.TAGS_LIST_FETCH_ACTION,
		payload,
	};
};

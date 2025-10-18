import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';

export const userFavouritesAction = () => {
	// Payload
	const payload = axios()
		.get(API.FOLLOWERS_LIST).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.USER_FAVOURITES_LIST_FETCH,
		payload,
	};
}

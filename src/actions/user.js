import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import sprintf from 'sprintf';
import {userProductsSerializer} from 'serializers/userSerializer';

export const userDetailsFetch = (props) => {
	const id = _.toNumber(_.get(props, ['user']));
	// Payload
	const payload = axios()
		.get(sprintf(API.USER_DETAILS_API, id)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.USER_DETAILS_FETCH,
		payload,
	};
};

export const userProductsAction = (data, query) => {
	const author = _.toInteger(_.get(data, ['user']))
	const params = userProductsSerializer(query)
	// Payload
	const payload = axios()
		.get(sprintf(API.USER_PRODUCTS_API, author), {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.USER_PRODUCTS_FETCH,
		payload,
	};
};

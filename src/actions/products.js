import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import {productCreateSerializer, productsFetchSerializer} from 'serializers/productSerializer';
import sprintf from 'sprintf';
import {WithSuccessDetail} from 'hooks/withSuccess';
import * as PATH from 'location/routes';

// Actions
export const productsListFetchAction = (data) => {
	// Params
	const params = productsFetchSerializer(data);
	// Payload
	const payload = axios()
		.get(API.PRODUCTS_LIST_API, {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.PRODUCTS_LIST_FETCH_ACTION,
		payload,
	};
};

export const productCreateAction = (data, user) => {
	// Params
	const params = productCreateSerializer(data, user);
	// Payload
	const payload = axios()
		.post(API.PRODUCT_CREATE_API, {...params})
		.then((response) => WithSuccessDetail(response, PATH.PRODUCT_DETAIL_URL))
		.catch((error) => {
			return Promise.reject(_.get(error, ['response', 'data']))
		});
	// Return
	return {
		type:actionTypes.PRODUCT_CREATE_ACTION,
		payload,
	};
};

export const productUpdateAction = (data, id, user, then) => {
	// Params
	const params = productCreateSerializer(data, user);
	// Payload
	const payload = axios()
		.put(sprintf(API.PRODUCT_UPDATE_API, Number(id)), {...params}).then((response) => {
			then(_.get(response, ['data']));
			return _.get(response, ['data']);
		})
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.PRODUCT_CREATE_ACTION,
		payload,
	};
};

export const productDeleteAction = (id) => {
	// Payload
	const payload = axios()
		.delete(sprintf(API.PRODUCT_DELETE_API, id)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.PRODUCT_DELETE_ACTION,
		payload,
	};
};

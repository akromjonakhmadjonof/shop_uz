import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import sprintf from 'sprintf';
import {recommendationAuthorSerializer, recommendationSerializer} from 'serializers/productSerializer';

// Action
export const ordersListFetchAction = () => {
	// Payload
	const payload = axios()
		.get(API.ADS_LIST_API).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.USER_ADS_LIST_FETCH,
		payload,
	};
};

export const orderItemFetchAction = (id, catchError) => {
	// Payload
	const payload = axios()
		.get(sprintf(API.ORDERS_DETAIL_API, Number(id))).then((response) => _.get(response, ['data']))
		.catch((error) => {
			catchError(_.get(error, ['response', 'data']));
			return Promise.reject(_.get(error, ['response', 'data']));
		});
	// Return
	return {
		type:actionTypes.ORDERS_DETAIL_FETCH_ACTION,
		payload,
	};
};

export const orderRecommendation = (category, current) => {
	const params = recommendationSerializer(category, current)
	// Payload
	const payload = axios()
		.get(API.PRODUCT_RECOMMENDATION, {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.PRODUCT_RECOMMENDATION,
		payload,
	};
};

export const orderRecommendationAuthor = (author, current) => {
	const params = recommendationAuthorSerializer(author, current)
	// Payload
	const payload = axios()
		.get(API.PRODUCT_RECOMMENDATION_AUTHOR, {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.PRODUCT_RECOMMENDATION_AUTHOR,
		payload,
	};
};

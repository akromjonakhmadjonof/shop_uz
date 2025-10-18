import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import sprintf from 'sprintf';
import {category} from 'constants/category';
import {parseParams} from 'tools/url';

export const fetchByCategoryAction = (data, type) => {
	const search = _.get(data, ['search']);
	const searchObj = parseParams(search);
	const page = _.get(searchObj, ['page']);
	const params = {};
	const current = _.filter(category, (item) => item.href === type)[0];
	// Payload
	const payload = axios()
		.get(sprintf(API.CATEGORIES_LIST_API, _.get(current, ['label'])), {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.FETCH_BY_CATEGORY,
		payload,
	};
};

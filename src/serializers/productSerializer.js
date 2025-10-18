import {parseParams} from 'tools/url';
import _ from 'lodash';
import moment from 'moment';
import numberWithoutSpaces from 'tools/numberWithoutSpaces';
import {category} from 'constants/category';
import {currency, measurement, status} from 'constants/backendConstants';

export const productsFetchSerializer = (params) => {
	const location = _.get(params, ['location', 'search']);
	const searchObj = parseParams(location);
	const page = _.get(searchObj, ['page']);
	const pageSize = _.get(searchObj, ['pageSize']);
	const search = _.get(searchObj, ['search']);
	return {
		'page':page,
		'page_size':pageSize,
		'search':search,
	};
};

export const productCreateSerializer = (data, user) => {
	const fields = _.filter([1, 2, 3, 4, 5, 6, 7, 8], (item) => {
		const name = `avatar_${item}`;
		return _.get(data, [name]);
	});
	const images = _.map(fields, (item, key) => {
		const name = `avatar_${item}`;
		const image = _.get(data, [name, 'src']);
		const fileName = _.get(data, [name, 'fileName']);
		return {
			file_name:fileName,
			src:image,
			type:key === 0 ? 'parent' : 'child',
		};
	});
	const balance = numberWithoutSpaces(_.get(data, ['balance']));
	const currentCurrency = _.filter(currency, (item) => item.id === _.get(data, ['currency']));
	const currentMeasurement = _.filter(measurement, (item) => item.id === _.get(data, ['measurement']));
	const phoneNumber = _.get(data, ['phoneNumber']);
	const tags = _.get(data, ['tags']);
	const contactPerson = _.get(data, ['contactPerson']);
	const discountPrice = numberWithoutSpaces(_.get(data, ['discountPrice']));
	const price = numberWithoutSpaces(_.get(data, ['price']));
	const description = _.get(data, ['description']);
	const discountPercent = (Number(discountPrice) * 100) / Number(price);
	const product_type = _.get(data, ['productType']);
	const currentStatus = _.filter(status, (item) => item.id === _.get(data, ['status']));
	const name = _.get(data, ['productName']);
	const parent = _.filter(category, (item) => item.id === product_type);
	const product = {
		'name':name,
		'description':description,
		'category':{
			'id':'1',
			'name':'category',
		},
		'status':currentStatus[0],
		'balance':balance,
	};

	return {
		'product':product,
		'pricing':{
			'discount_price':discountPrice,
			'discount_percent':discountPercent || 0,
			'price':price,
		},
		'currency':currentCurrency[0],
		'created_date':moment().format('YYYY-MM-DD'),
		'measurement':currentMeasurement[0],
		'parent':{
			'label':_.get(parent[0], ['label']),
			'id':_.get(parent[0], ['id']),
		},
		'additional':{
			'name':contactPerson,
			'phone_number':phoneNumber
		},
		'images':images,
		'tags':tags,
	};
};

export const recommendationSerializer = (category) => {
	return {
		'page': 1,
		'page_size': 15,
		'category': category
	}
}

export const recommendationAuthorSerializer = (author) => {
	return {
		'page': 1,
		'page_size': 15,
		'author': author
	}
}

import _ from 'lodash';

const toSnakeCase = (data, headers) => {
	if (_.isArray(data)) {
		return _.map(data, (item) => toSnakeCase(item));
	}

	if (_.isObject(data)) {
		return _
			.chain(data)
			.mapKeys((value, key) => _.snakeCase(key))
			.mapValues((value) => toSnakeCase(value))
			.value();
	}
	return data;
};

export default toSnakeCase;

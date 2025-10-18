import _ from 'lodash';
import {category} from 'constants/category';

const getSubCategories = (name = '') => {
	const currentCategory =  _.filter(category, (item) => {
		return item.href === name
	})[0]
	return _.get(currentCategory, ['children'])
};

export default getSubCategories;

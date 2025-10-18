import _ from 'lodash';

export const followersListFilterSerializer = (data) => {
	return {
		'search':_.get(data, ['search'])
	};
};

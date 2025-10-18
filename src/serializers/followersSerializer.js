import _ from 'lodash';

export const followersSerializer = (data) => {
	const user = _.get(data, ['user'])
	return {
		'user': user
	}
}

export const createFollowSerializer = (id) => {
	return {
		'target': id
	}
}

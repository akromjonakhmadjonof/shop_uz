import * as serializers from 'serializers/followersSerializer';
import axios from 'tools/axios';
import * as API from 'constants/api';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import sprintf from 'sprintf';

export const followersListFetch = (data) => {
	const params = serializers.followersSerializer(data)
	// Payload
	const payload = axios()
		.get(API.FOLLOWERS_LIST, {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.FOLLOWERS_LIST_FETCH,
		payload,
	};
}

export const followingsListFetch = (data) => {
	const params = serializers.followersSerializer(data)
	// Payload
	const payload = axios()
		.get(API.FOLLOWINGS_LIST, {params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.FOLLOWINGS_LIST_FETCH,
		payload,
	};
}

export const followCreate = (id) => {
// Params
	const params = serializers.createFollowSerializer(id);
	// Payload
	const payload = axios()
		.post(API.FOLLOW_CREATE, {...params}).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.FOLLOW_CREATE,
		payload,
	};

}
export const followDelete = (id) => {
	// Payload
	const payload = axios()
		.delete(sprintf(API.FOLLOW_DELETE, id)).then((response) => _.get(response, ['data']))
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.FOLLOW_CREATE,
		payload,
	};

}

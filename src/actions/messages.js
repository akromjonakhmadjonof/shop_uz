import * as API from 'constants/api';
import axios from 'tools/axios';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';

export const createChatAction = (target_id, then) => {
	const data = {
		target_id:target_id
	};
	// Payload
	const payload = axios().post(API.CHATS_CREATE, data).then((response) => {
		then(_.get(response, ['data']));
		console.log(_.get(response, ['data']))
		return _.get(response, ['data']);
	}).catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	// Return
	return {
		type:actionTypes.CHAT_CREATE,
		payload,
	};

};

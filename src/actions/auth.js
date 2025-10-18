import {
	completeSignUpSerializer,
	settingsSerializer,
	signInSerializer,
	signUpSerializer
} from 'serializers/authSerializer';
import * as API from 'constants/api';
import axios from 'tools/axios';
import _ from 'lodash';
import * as actionTypes from 'store/actionTypes';
import {removeToken, setToken, setUser} from 'tools/storage/storage';

export const signInAction = (data, catchError) => {
	const params = signInSerializer(data);
	const payload = axios().post(API.SING_IN_API, {...params}).then((response) => {
		const token = _.get(response, ['data', 'token']);
		const data = _.get(response, ['data']);
		setUser(data);
		setToken(token);
		return data;
	}).catch(catchError).catch((error) => {
		return Promise.reject(_.get(error, ['response', 'data']));
	});
	return {
		type:actionTypes.USER_AUTH_SING_IN,
		payload,
	};
};

export const authAction = () => {
	const payload = axios().get(API.AUTH_API).then((response) => {
		const data = _.get(response, ['data']);
		setUser(data);
		return _.get(response, ['data']);
	}).catch((error) => {
		removeToken();
		localStorage.removeItem('user');
		return Promise.reject(_.get(error, ['response', 'data']));
	});
	return {
		type:actionTypes.USER_AUTH,
		payload,
	};
};

export const signUpAction = (data, then) => {
	const params = signUpSerializer(data);
	const payload = axios().post(API.SING_UP_API, {...params})
		.then((response) => {
			const token = _.get(response, ['data', 'token']);
			const data = _.get(response, ['data']);
			setUser(data, true);
			setToken(token, true);
			then();
			return _.get(response, ['data']);
		})
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	return {
		type:actionTypes.USER_AUTH_SING_UP,
		payload,
	};
};

export const completeSignUpAction = (data, then) => {
	const params = completeSignUpSerializer(data);
	const payload = axios().put(API.COMPLETE_SING_UP_API, {...params})
		.then((response) => {
			then(_.get(response, ['data']));
			return _.get(response, ['data']);
		})
		.catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	return {
		type:actionTypes.USER_AUTH_SING_UP_COMPLETE,
		payload,
	};
};

export const signOutAction = () => {
	removeToken();
	localStorage.clear()
	sessionStorage.clear()
	return {
		type:actionTypes.USER_AUTH_SING_IN,
		payload:null,
	};
};

export const userSettings = (data, type) => {
	const params = settingsSerializer(data, type);
	const payload = axios().put(API.SETTINGS_API, {...params}).then((response) => _.get(response, ['data'])).catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	return {
		type:actionTypes.USER_SETTINGS,
		payload,
	};
};

export const deleteAccountAction = () => {
	const payload = axios().delete('/auth/delete-user/').then((response) => {
		removeToken();
		return _.get(response, ['data']);
	}).catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
	return {
		type:actionTypes.USER_DELETE,
		payload,
	};
};

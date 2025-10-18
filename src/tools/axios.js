import axios from 'axios';
import {getToken} from './storage/storage';
import {getLanguageKey} from './getLanguage';

// http://localhost:9998/ <=> http://192.168.199.122:9998/

const axiosRequest = () => {
	axios.defaults.headers.common.Token = getToken();
	axios.defaults.baseURL = 'http://localhost:9998/';
	axios.defaults.headers['Accept-Language'] = getLanguageKey();
	return axios;
};

export default axiosRequest;

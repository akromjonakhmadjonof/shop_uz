import moment from 'moment';
import {getLanguage} from './storage/storage';

const dateFormat = (date, time, defaultText) => {
	const local = getLanguage() === 'uz' ? 'ru' : getLanguage();
	const dateTime = moment(date).locale(getLanguage()).format('DD MMM YYYY, HH:mm');
	return (date && time) ? dateTime : (date) ? moment(date).locale(local).format('DD MMM YYYY') : defaultText;
};

export default dateFormat;

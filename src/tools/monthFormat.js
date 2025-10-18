import moment from 'moment';
import _ from 'lodash';

const monthFormat = (date) => {
	let month = 0;
	if (!date) {
		return date;
	}

	const JAN = 1;
	const FEB = 2;
	const MAR = 3;
	const APR = 4;
	const MAY = 5;
	const JUN = 6;
	const JUL = 7;
	const AUG = 8;
	const SEP = 9;
	const OCT = 10;
	const NOV = 11;
	const DEC = 12;
	switch (_.toNumber(moment(date).format('MM'))) {
	case JAN:
		month = 'Янв';
		break;
	case FEB:
		month = 'Фев';
		break;
	case MAR:
		month = 'Мар';
		break;
	case APR:
		month = 'Апр';
		break;
	case MAY:
		month = 'Май';
		break;
	case JUN:
		month = 'Июн';
		break;
	case JUL:
		month = 'Июл';
		break;
	case AUG:
		month = 'Авг';
		break;
	case SEP:
		month = 'Сен';
		break;
	case OCT:
		month = 'Окт';
		break;
	case NOV:
		month = 'Ноя';
		break;
	case DEC:
		month = 'Дек';
		break;
	default:
		return null;
	}
	return month;
};

export default monthFormat;

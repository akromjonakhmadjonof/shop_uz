import _ from 'lodash';

const FLOOR = 3;
const numberFormat = (amount, suffix, precision = FLOOR) => {
	const ZERO = 0;
	const formatter = new Intl.NumberFormat('ru-RU', {maximumFractionDigits:precision});
	const floor = _.toNumber(amount);
	if (suffix) {
		return `${(amount) ? formatter.format(floor) : ZERO} ${suffix || ''}`;
	}
	return ((amount) ? formatter.format(floor) : ZERO);
};

export default numberFormat;

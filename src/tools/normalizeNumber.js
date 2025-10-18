import {replace} from 'ramda';
import numberWithoutSpaces from './numberWithoutSpaces';
import toNumber from './toNumber';

const normalizeNumber = (value) => {
	const numberValue = toNumber(numberWithoutSpaces(value));
	if (!value) {
		return value;
	}
	if (isNaN(numberValue)) {
		return '';
	}
	const onlyNums = replace(/ /g, '', replace('.', ',', value));
	const onlyNumsAndSymbol = replace(/[^\d\W]/g, '', onlyNums);
	return onlyNumsAndSymbol.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default normalizeNumber;

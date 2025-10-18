import {length, replace} from 'ramda';

const normalizePhone = (value) => {
	if (!value) return value;
	const withoutSpaces = replace(/ /g, '', value);
	const onlyNumsAndSymbol = replace(/[^\d\W]/g, '', withoutSpaces);
	if (length(onlyNumsAndSymbol) <= 4) {
		// Не возможно стереть! (всегда 4 числа), но если Убрать пробел, можно стереть
		return `${onlyNumsAndSymbol.slice(0, 4)} `;
	}
	if (length(onlyNumsAndSymbol) <= 6) {
		return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)}`;
	}
	if (length(onlyNumsAndSymbol) <= 9) {
		return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)}`;
	}
	if (length(onlyNumsAndSymbol) <= 11) {
		return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)}`;
	}
	if (length(onlyNumsAndSymbol) <= 13 || length(onlyNumsAndSymbol) > 13) {
		return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)} ${onlyNumsAndSymbol.slice(11, 13)}`;
	}
};

export default normalizePhone;

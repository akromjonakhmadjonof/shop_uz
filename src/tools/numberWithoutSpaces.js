const numberWithoutSpaces = (amount) => {
	const string = `${amount}`;
	const formatted = string.replace(/ /g, '').replace(',', '.');
	return +formatted || 0;
};

export default numberWithoutSpaces;

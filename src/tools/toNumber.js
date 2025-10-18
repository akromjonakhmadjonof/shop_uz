export default (value) => {
	const parsedStr = Number(value);
	return isNaN(parsedStr) ? 0 : parsedStr;
};

import {useEffect, useState} from 'react';

export default (value, delay = 1000) => {
	// useState
	const [debouncedValue, setDebouncedValue] = useState(value);

	// useEffect
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
		// eslint-disable-next-line
	}, [value]);

	// Return
	return debouncedValue;
};

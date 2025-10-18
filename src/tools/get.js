import {
	compose,
	curry,
	filter,
	find,
	flatten,
	fromPairs,
	isNil,
	map,
	not,
	path,
	pathOr,
	pipe,
	prop,
	propEq,
	values,
} from 'ramda';
import {parseParams} from './url';

export const getIdFromProps = curry((paramName, props) => compose(parseInt, pathOr(0, ['match', 'params', paramName]))(props));

export const getParamsFormHistory = compose(
	parseParams,
	decodeURIComponent,
	path(['location', 'search']),
);

export const getParamFormHistory = curry((key, history) => compose(prop(key), parseParams, path(['location', 'search']))(history));

export const getDataFromState = curry((name, state) => ({
	loading:path([name, 'loading'], state),
	failed:path([name, 'failed'], state),
	error:path([name, ['error']], state),
	data:path([name, 'data'], state),
	results:path([name, 'data', 'documents'], state) || [],
	count:path([name, 'data', 'count'], state) || 0,
}));

export const getPayloadState = curry((name, state) => prop(name, state));

export const get2D = (num) => {
	if (num.toString().length < 2) {
		return `0${num}`;
	}
	return num.toString();
};

export const getDuration = (seconds) => {
	const secs = get2D(seconds % 60);
	const mins = get2D(Math.floor(seconds / 60));

	return `${mins}:${secs}`;
};

// eslint-disable-next-line no-shadow
export const getIdForInitValues = (data, keys) => pipe(
	map((key) => {
		const value = prop(key, data);
		if (isNil(value)) {
			return null;
		}
		if (isNaN(value)) {
			return [key, {id:value}];
		}
		return [key, {id:Number(value)}];
	}),
	filter(pipe(isNil, not)),
	fromPairs,
)(keys);

export const getItemFromTree = (arr, target) => {
	// eslint-disable-next-line guard-for-in,no-unused-vars
	for (const i in arr) {
		const a = arr[i];
		if (a.id === target) {
			return a;
		}
		if (Array.isArray(a.children)) {
			const child = getItemFromTree(a.children, target);
			// eslint-disable-next-line max-depth
			if (child !== null) {
				return child;
			}
		}
	}
	return null;
};

export const getFullTreeForItem = (arr, target) => {
	const endlessTree = (arrNext, targetNext) => [1].reduce((result) => {
		const foundItem = getItemFromTree(arr, targetNext);
		result.push(foundItem);
		foundItem.parent && result.push(getFullTreeForItem(arrNext, foundItem.parent.id));
		return result;
	}, []);
	return flatten(endlessTree(arr, target));
};

export const arrayObjToObj = pipe(map(values), fromPairs);

export const getPrimaryImage = pipe(
	pathOr([], ['images']),
	find(propEq('isPrimary', true)),
	prop('image'),
);

export const getAddressExtraDetails = (address) => {
	const house = prop('dom', address);
	const entrance = prop('podezd', address);
	const floor = prop('etaj', address);
	const office = prop('office', address);
	const doorPhoneCode = prop('doorphoneСode', address);

	return [
		house && `${house} дом`,
		office && `${office} кв./оф.`,
		entrance && `${entrance} подьезд`,
		floor && `этаж ${floor}`,
		doorPhoneCode && `код от домофона: ${doorPhoneCode}`,
	].filter(Boolean).join(', ');
};

import {
	concat,
	curry,
	defaultTo,
	filter,
	find,
	fromPairs,
	head,
	is,
	isEmpty,
	isNil,
	join,
	map,
	merge,
	not,
	pipe,
	prop,
	propEq,
	replace,
	sort,
	split,
	subtract,
	test,
	toPairs,
	union,
	uniq,
	without,
} from 'ramda';
import {replaceParamsRoute} from './route';

const parseParams = (url) => {
	const [, search] = split('?', url);
	const searchToObject = pipe(
		split('&'),
		map(split('=')),
		fromPairs,
	);
	return search ? searchToObject(search) : {};
};

const getSearchParam = (paramName, search) => prop(paramName, parseParams(search));

const paramsToSearch = pipe(
	toPairs,
	map(join('=')),
	join('&'),
);

const getPathnameFromUrl = pipe(
	split('?'),
	head,
);

const appendParamsToUrl = curry((appendParams, url) => {
	const pathname = getPathnameFromUrl(url);
	const params = parseParams(url);
	const newParams = pipe(
		merge(params),
		filter(
			pipe(
				isEmpty,
				not,
			),
		),
	)(appendParams);
	return `${pathname}?${paramsToSearch(newParams)}`;
});

const removeItemFromSelect = (search, key, value) => {
	const params = parseParams(search);
	const values = is(Array, value) ? map(String, value) : [String(value)];

	return pipe(
		prop(key),
		defaultTo(''),
		split(','),
		filter((item) => item),
		without(values),
		uniq,
		sort(subtract),
		join(','),
	)(params);
};

const removeItemFromParams = (params, key, value) => {
	const values = is(Array, value) ? map(String, value) : [String(value)];

	return pipe(
		prop(key),
		defaultTo(''),
		split('-'),
		filter((item) => item),
		without(values),
		uniq,
		sort(subtract),
		join('-'),
	)(params);
};

const addItemToSelect = (url, key, value) => {
	const params = parseParams(url);
	const values = is(Array, value) ? map(String, value) : [String(value)];

	return pipe(
		prop(key),
		defaultTo(''),
		split(','),
		filter((item) => item),
		concat(values),
		uniq,
		sort(subtract),
		join(','),
	)(params);
};

const getSortingType = (history, columnSortingName) => {
	const {search} = history.location;
	const params = parseParams(search);
	const currentOrdering = prop('ordering', params);
	const columnType = currentOrdering ? pipe(
		split(','),
		filter(pipe(isEmpty, not)),
		map((column) => {
			const isStart = test(/^-/, column);
			const columnTrimStart = isStart ? replace(/-/, '', column) : column;
			return {column:columnTrimStart, desc:test(/^-/, column)};
		}),
		find(propEq('column', columnSortingName)),
		prop('desc'),
	)(currentOrdering) : undefined;
	return isNil(columnType) ? null : columnType;
};

const sortingURL = (history, columnSortingName) => {
	const {search} = history.location;
	const params = parseParams(search);
	const currentOrdering = prop('ordering', params);
	const columnList = currentOrdering ? pipe(
		split(','),
		filter(pipe(isEmpty, not)),
		map((column) => {
			const isStart = test(/^-/, column);
			const columnTrimStart = isStart ? replace(/-/, '', column) : column;
			return {column:columnTrimStart, desc:test(/^-/, column)};
		}),
	)(currentOrdering) : [];
	const columnSortingType = isEmpty(columnList) ? undefined : pipe(
		find(propEq('column', columnSortingName)),
		prop('desc'),
	)(columnList);
	const columnSortingDesc = columnSortingType === undefined ? false : (columnSortingType ? undefined : true);
	const ordering = pipe(
		filter((item) => item.column !== columnSortingName),
		union([{column:columnSortingName, desc:columnSortingDesc}]),
		filter(pipe(prop('desc'), isNil, not)),
		map((item) => (prop('desc', item) ? `-${prop('column', item)}` : prop('column', item))),
		join(','),
	)(columnList);
	return replaceParamsRoute({ordering}, history);
};

export {
	parseParams,
	getSearchParam,
	getSortingType,
	sortingURL,
	appendParamsToUrl,
	removeItemFromSelect,
	addItemToSelect,
	removeItemFromParams,
};

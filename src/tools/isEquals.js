import {compose, curry, either, equals, filter, isEmpty, isNil, not, pick,} from 'ramda';
import {parseParams} from './url';

export const DEFAULT_PICK_PARAMS = ['search', 'page', 'ordering'];

const getPickParamsFromSearch = (pickParams, search) => compose(
	filter(
		compose(
			not,
			either(isNil, isEmpty),
		),
	),
	pick(pickParams),
	parseParams,
)(search);

export const isEqualSearch = curry((pickParams, prev, current) => equals(
	getPickParamsFromSearch(pickParams, prev),
	getPickParamsFromSearch(pickParams, current),
));

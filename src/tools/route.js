import {__, assoc, compose, curry, defaultTo, path,} from 'ramda';

import {appendParamsToUrl} from './url';

export const redirect = curry(({pathname, params}, history) => compose(
	history.push,
	appendParamsToUrl(params),
	defaultTo(path(['location', 'pathname'], history)),
)(pathname));

export const replace = curry(({pathname, params}, history) => compose(
	history.replace,
	appendParamsToUrl(params),
	defaultTo(path(['location', 'pathname'], history)),
)(pathname));

export const replaceParamsRoute = curry((params, history) => compose(
	replace(__, history),
	assoc('pathname', __, {}),
	appendParamsToUrl(params),
	path(['location', 'search']),
)(history));

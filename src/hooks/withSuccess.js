import {useHistory} from 'react-router-dom';
import _ from 'lodash';
import {appendParamsToUrl} from 'tools/url';
import sprintf from 'sprintf';

export const WithSuccess = (response, pathname, query) => {
	const history = useHistory();
	const search = _.get(history, ['location', 'search']);
	history.push({
		pathname:pathname,
		search:appendParamsToUrl({...query}, search)
	});
	return _.get(response, ['data']);
};

export const WithSuccessDetail = (response, pathname, uniquePath = 'id', query) => {
	const history = useHistory();
	const search = _.get(history, ['location', 'search']);
	const path = _.get(response, ['data', uniquePath])
	history.push({
		pathname: sprintf(pathname, path),
		search:appendParamsToUrl({...query}, search)
	});
	return _.get(response, ['data']);
};

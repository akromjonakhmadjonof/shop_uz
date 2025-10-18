import {equals} from 'ramda';
import {useDispatch, useSelector} from 'react-redux';
import {getDataFromState} from 'tools/get';
import useCompareEffect from './useCompareEffect';
import {parseParams} from 'tools/url';
import {useLocation} from 'react-router-dom';
import _ from 'lodash';
import {useParams} from 'react-router';

const useFetchList = (params) => {
	const {
		stateName,
		action,
		mapper = parseParams,
		pickParams = ['page', 'pageSize', 'search'],
	} = params;
	const dispatch = useDispatch();
	const location = useLocation();
	const search = _.get(location, ['search']);

	const searchParams = mapper(search);
	const {...routerParams} = useParams();
	const data = useSelector(getDataFromState(stateName), equals);
	if (pickParams) {
		useCompareEffect(() => {
			const searchKeys = Object.keys(searchParams);
			const contain = searchKeys.every((element) => {
				return pickParams.includes(element);
			});
			if (contain) {
				dispatch(action({...searchParams, ...routerParams, location}));
			}
		}, [searchParams, routerParams]);

		return data;
	}
	return useCompareEffect(() => {
		dispatch(action({...searchParams, ...routerParams, location}));
	}, []);

};

export default useFetchList;

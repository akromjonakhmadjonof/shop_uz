import React, {useState} from 'react';
import _ from 'lodash';
import {path, pathOr, prop} from 'ramda';
import {useLocation} from 'react-router-dom';
import {parseParams} from 'tools/url';
import {useDispatch, useSelector} from 'react-redux';
import useCompareEffect from 'hooks/useCompareEffect';
import InfiniteScroller from 'react-infinite-scroller';
import toSnakeCase from 'tools/toSnakeCase';
import axios from 'tools/axios';

const fetchAction = (props) => {
	const {
		params,
		api,
		actionType,
		stateName,
		isExtra = false,
	} = props;

	return (dispatch, getState) => {
		const payload = axios({dispatch, getState})
			.get(api, {params})
			.then((response) => {
				const store = getState();
				const currState = prop(stateName, store);

				const currResults = path(['data', 'documents'], currState);
				const countResponse = pathOr(0, ['data', 'count'], response);
				const resultsResponse = pathOr([], ['data', 'documents'], response);

				if (isExtra) {
					return {
						count:countResponse,
						results:[...currResults, ...resultsResponse],
					};
				}
				return {
					count:countResponse,
					results:resultsResponse,
				};
			})
			.catch((e) => Promise.reject(_.get(e, ['response', 'data'])));

		return dispatch({
			type:`${actionType}`,
			payload,
		});
	};
};

function InfiniteScroll(props) {
	const {
		params,
		element = 'div',
		serializer = toSnakeCase,
		styles,
		threshold = 50,
		api,
		renderContent,
		actionType,
		stateName,
		useWindow = false,
	} = props;
	// Hooks
	const location = useLocation();
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	// Data
	const nextPage = +currentPage + 1;
	const search = _.get(location, ['search']);
	const searchObj = parseParams(search);
	const state = useSelector((state) => state);
	const checkStateName = stateName.split('.');
	const stateData = _.get(state, [...checkStateName, 'data', 'documents']);
	const stateDataCount = _.get(state, [...checkStateName, 'data', 'count']) || 0;
	const stateLoading = prop('loading', state);
	const stateFailed = prop('failed', state);
	const listCount = Array.isArray(stateData) ? _.size(stateData) : 0;
	const hasMore = (listCount < stateDataCount) && !stateLoading;
	const isEmptyData = (listCount === 0 && !stateLoading) || stateFailed;
	const isInitialLoad = listCount === 0 && stateLoading;

	// FetchInitialRequest
	useCompareEffect(() => {
		const actionParams = {
			...searchObj,
			...params,
			// page: currentPage
		};
		const actionProps = {
			params:serializer(actionParams),
			api,
			dispatch,
			actionType,
			stateName,
			isExtra:false,
		};
		// FetchData
		setTimeout(
			() => dispatch(fetchAction(actionProps)),
			// .catch(() => alert('Fetch error - initial fetch'))
			0,
		);
	}, [searchObj]);

	// Load more
	const loadMore = () => {
		console.error('LOAD MORE');

		const actionParams = {
			...searchObj,
			...params,
			page:nextPage,
		};
		const actionProps = {
			params:serializer(actionParams),
			api,
			dispatch,
			actionType,
			stateName,
			isExtra:true,
		};

		// FetchData
		setTimeout(() => hasMore && dispatch(fetchAction(actionProps))
			.then(() => setCurrentPage(+currentPage + 1))
			.catch(() => alert('Fetch error - load more')), 0);
	};

	function Item(props) {
		return (
			<div>
				No Sample Item Component !!!
				<br/>
			</div>
		);
	}

	const loader = (<>Loading...</>);
	const empty = (<>empty...</>);
	const Template = renderContent || Item;
	const list = _.map(stateData, (item, key) => <Template key={key} data={item}/>);
	const content = isInitialLoad
		? loader
		: isEmptyData
			? empty
			: list;
	// Render
	return (
		<InfiniteScroller
			threshold={threshold}
			useWindow={useWindow}
			// initialLoad={isInitialLoad}
			hasMore={hasMore}
			loadMore={loadMore}
			element={element}
			style={{...styles}}
		>
			{content}
		</InfiniteScroller>
	);
}

export default InfiniteScroll;

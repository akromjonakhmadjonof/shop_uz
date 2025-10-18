import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import useFetchList from 'hooks/useFetchList';
import * as STATE from 'store/state';
import {useLocation} from 'react-router-dom';
import {ordersListFetchAction} from 'actions/orders';
import Orders from './Orders';

// Enhance
const enhance = compose(connect((state) => {
	const products = _.get(state, ['ordersList', 'data', 'documents']);
	return {
		products,
	};
}));

// Wrapper
function OrdersWrapper(props) {
	// Props data
	const {products} = props;
	// Hooks
	const location = useLocation();
	// Handlers
	useFetchList({
		action:ordersListFetchAction,
		stateName:STATE.ORDERS_LIST,
	});
	// Render
	return (
		<Orders
			products={products}
		/>
	);
}

export default enhance(OrdersWrapper);

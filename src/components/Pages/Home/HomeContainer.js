import React, {useState} from 'react';
import {connect} from 'react-redux';
import {productsListFetchAction} from 'actions/products';
import {compose} from 'recompose';
import _ from 'lodash';
import useFetchList from 'hooks/useFetchList';
import * as STATE from 'store/state';
import Home from './Home';
import {socket} from 'App';

// Enhance
const enhance = compose(connect((state) => {
	const products = _.get(state, ['homeProducts', 'data', 'documents']);
	const count = _.get(state, ['homeProducts', 'data', 'count']);
	const loading = _.get(state, ['homeProducts', 'loading']);
	return {
		products,
		count,
		loading:loading ? 1 : 0,
	};
}));

// Container
function HomeContainer(props) {
	// Props data
	const {products, loading, count} = props;

	// Handlers
	useFetchList({
		action:productsListFetchAction,
		state:STATE.HOME_LIST
	});

	React.useEffect(() => {
		socket.emit('get_favourites_card');
	}, []);

	const [cart, setCart] = useState([]);

	React.useEffect(() => {
		socket.emit('get_basket');
		socket.on('basket_updated', () => {
			socket.emit('get_basket');
		});
		socket.on('give_basket', (data) => {
			setCart((data));
		});
	}, []);

	// Render
	return (
		<Home
			count={count}
			cart={cart}
			loading={loading ? 1 : 0}
			products={products}
		/>
	);
}

export default enhance(HomeContainer);

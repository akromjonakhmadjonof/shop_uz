import React from 'react';
import Basket from './Basket';
import {useState} from 'react';
import {socket} from 'App';
import _ from 'lodash';
import toCamelCase from 'tools/toCamelCase';


function BasketWrapper(props) {
	const [cart, setCart] = useState([]);

	React.useEffect(() => {
		socket.emit('get_basket_card');
		socket.on('basket_updated', () => {
			socket.emit('get_basket_card');
		});
		socket.on('give_basket_card', (data) => {
			setCart(toCamelCase(data));
		});
	}, []);
	const cartLength = _.size(cart)

	const sum = _.filter(cart, (item) => {
		return _.get(item, ['currency', 'id']) === 1
	})

	const usd = _.filter(cart, (item) => {
		return _.get(item, ['currency', 'id']) === 2
	})
	const rub = _.filter(cart, (item) => {
		return _.get(item, ['currency', 'id']) === 3
	})

	const sumSum = _.sumBy(sum, (item) => {
		return _.toInteger(_.get(item, ['pricing', 'sellPrice']))
	})
	const sumUsd = _.sumBy(usd, (item) => {
		return _.toInteger(_.get(item, ['pricing', 'sellPrice']))
	})
	const sumRub = _.sumBy(rub, (item) => {
		return _.toInteger(_.get(item, ['pricing', 'sellPrice']))
	})
	return (
		<Basket
			sum={sumSum}
			usd={sumUsd}
			rub={sumRub}
			products={cart}
			length={cartLength}
		/>
	);
}

export default BasketWrapper;

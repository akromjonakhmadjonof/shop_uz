import React, {useEffect, useState} from 'react';
import Favourites from './Favourites';
import {socket} from 'App';
import toCamelCase from 'tools/toCamelCase';

// Container
function FavouritesWrapper() {
	const [cart, setCart] = useState([])
	useEffect(() => {
		socket.emit('get_favourites_card');
		socket.on('give_favourites_card', (data) => {
			setCart(toCamelCase(data))
		});
	}, []);

	// Render
	return (
		<Favourites
			list={cart}
		/>
	);
}

export default FavouritesWrapper;

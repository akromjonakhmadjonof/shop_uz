import React, {useState} from 'react';
import {useCart} from 'hooks/useCart';
import {openSnackbarAction} from 'actions/snackbar';
import {connect} from 'react-redux';
import {compose, withHandlers} from 'recompose';
import * as STATE from 'constants/stateNames';
import {getStorage, getToken} from 'tools/storage/storage';
import {map, prop} from 'ramda';
import {t} from 'i18next';
import _ from 'lodash';
import Card from './Card';
import {socket} from 'App';

const enhance = compose(
	connect((state) => {
		const favourites = JSON.parse(getStorage(true).getItem(STATE.FAVOURITES)) || [];
		const token = getToken();
		return {
			favourites,
			token,
		};
	}),
	withHandlers({
		handleDeleteProduct:(props) => (productId) => {
			const {dispatch} = props;
			const {handleDelete} = useCart(dispatch);
			handleDelete(productId);
			dispatch(openSnackbarAction({
				type:'success',
				message:`${t('successful_removed')}!`,
			}));
		},

		handleAddToFavourites:(props) => (product) => {
			const {dispatch} = props;
			const {handleAddFavourites} = useCart(dispatch);
			handleAddFavourites(product);
		},

		handleRemoveFavourite:(props) => (product) => {
			const {dispatch} = props;
			const {handleRemoveFavourites} = useCart(dispatch);
			handleRemoveFavourites(product);
		},

		handleAddProduct:(props) => (product) => {
			const {dispatch} = props;
			const {handleAdd} = useCart(dispatch);
			dispatch(openSnackbarAction({
				type:'success',
				message:`${t('successful_added')}!`,
			}));
			handleAdd(product);
		},
	}),
);

// Container
function CardWrapper(props) {
	// Props data
	const {
		product, cart, loading, isOrder, token,
	} = props;
	const [favourites, setFavourites] = useState([]);

	React.useEffect(() => {
		socket.emit('get_favourites');
		socket.on('favourites_updated', () => {
			socket.emit('get_favourites_card');
			socket.emit('get_favourites');
		});
		socket.on('give_favourites', (data) => {
			setFavourites((data));
		});
	}, []);

	// Params And Data
	const id = _.toInteger(_.get(product, ['id']));
	const isSelected = cart && cart.includes(id);
	const presentFavourites = favourites && favourites.includes(id);

	// Render
	return (
		<Card
			product={{...product, 'favourite':presentFavourites}}
			isOrder={isOrder}
			isSelected={isSelected}
			handleAdd={props.handleAddProduct}
			loading={loading ? 1 : 0}
			isAuth={token}
			handleDelete={props.handleDeleteProduct}
			handleAddToFavourites={props.handleAddToFavourites}
			handleRemoveFavourite={props.handleRemoveFavourite}
		/>
	);
}

export default enhance(CardWrapper);

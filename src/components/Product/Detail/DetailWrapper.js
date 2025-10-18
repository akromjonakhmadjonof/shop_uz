import React, {useState} from 'react';
import {useCart} from 'hooks/useCart';
import {openSnackbarAction} from 'actions/snackbar';
import {connect} from 'react-redux';
import {compose, withHandlers} from 'recompose';
import * as STATE from 'constants/stateNames';
import {getStorage} from 'tools/storage/storage';
import {map, prop} from 'ramda';
import {t} from 'i18next';
import _ from 'lodash';
import {useParams} from 'react-router-dom';
import useFetchList from 'hooks/useFetchList';
import {orderItemFetchAction, orderRecommendation, orderRecommendationAuthor} from 'actions/orders';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';
import {visitorsAction} from 'actions/visitors';
import Detail from './Detail';
import Document from 'components/Document';
import {socket} from 'App';

const enhance = compose(
	connect((state) => {
		const authData = _.get(state, ['auth', 'data']);
		const cart = JSON.parse(getStorage(true).getItem(STATE.CART)) || [];
		const favourites = JSON.parse(getStorage(true).getItem(STATE.FAVOURITES)) || [];
		const detailData = _.get(state, ['orderItem', 'data', 'document']);
		const visitors = _.get(state, ['visitors', 'data', 'results']);
		const detailLoading = _.get(state, ['orderItem', 'loading']);
		const recommendation = _.get(state, ['product', 'recommendation', 'data', 'documents'])
		const recommendationByAuthor = _.get(state, ['product', 'recommendationByAuthor', 'data', 'documents'])
		return {
			cart,
			visitors,
			recommendation,
			recommendationByAuthor,
			detailLoading,
			detailData,
			authData,
			favourites,
		};
	}),
	withHandlers({
		handleDeleteProduct:(props) => (productId) => {
			const {dispatch} = props;
			const {handleDelete} = useCart(dispatch);
			handleDelete(productId);
			dispatch(openSnackbarAction({
				message:`${t('successful_removed')}!`,
			}));
		},

		handleAddToFavourites:(props) => (product) => {
			const {dispatch} = props;
			const {handleAddFavourites} = useCart(dispatch);
			dispatch(handleAddFavourites(product));
		},

		handleRemoveFavourite:(props) => (product) => {
			const {dispatch} = props;
			const {handleRemoveFavourites} = useCart(dispatch);
			dispatch(handleRemoveFavourites(product));
		},

		handleAddProduct:(props) => (product) => {
			const {dispatch} = props;
			const {handleAdd} = useCart(dispatch);
			dispatch(openSnackbarAction({
				message:`${t('successful_added')}!`,
			}));
			handleAdd(product);
		},
	}),
);

function DetailWrapper(props) {
	const {productId, author, category} = useParams();
	const {
		recommendationByAuthor,
		visitors,
		dispatch,
		detailData,
		detailLoading,
		recommendation,
		authData
	} = props;
	// Handlers
	const catchError = (error) => {
		dispatch(openSnackbarAction({
			...error,
			type:'danger'
		}));
	};

	// Hooks
	useFetchList({
		action:() => orderItemFetchAction(productId, catchError),
		pickParams: ['productId']
	});

	useFetchList({
		action:() => visitorsAction(productId),
		pickParams: ['productId']
	});

	useFetchList({
		action:() => orderRecommendation(category, productId),
		pickParams:['productId']
	});

	useFetchList({
		action:() => orderRecommendationAuthor(author, productId),
		pickParams:['productId']
	});


	const [favourites, setFavourites] = useState([]);

	React.useEffect(() => {
		socket.emit('get_favourites');
		socket.on('favourites_updated', () => {
			socket.emit('get_favourites');
			socket.emit('get_favourites_card');
		});
		socket.on('give_favourites', (data) => {
			setFavourites((data));
		});
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
	// Data
	const product = {...detailData};
	const id = _.get(product, ['id']);

	// Check
	const presentFavourites = favourites && favourites.includes(id);
	const isSelected = cart && _.includes(cart, id);

	// Check mat update
	const productName = _.get(product, ['product', 'name']);
	const userName = _.get(authData, ['userName']);
	const authorName = _.get(product, ['author', 'userName']);
	const accessToUpdate = userName === authorName;

	// Render
	if (!detailLoading) {
		return (
			<Document title={'shop.uz - ' + productName}>
				<Detail
					accessToUpdate={accessToUpdate}
					product={{...product, 'favourite':presentFavourites}}
					isSelected={isSelected}
					handleDelete={props.handleDeleteProduct}
					recommendation={recommendation}
					visitors={visitors}
					recommendationByAuthor={recommendationByAuthor}
					handleAdd={props.handleAddProduct}
					handleAddToFavourites={props.handleAddToFavourites}
					handleRemoveFavourite={props.handleRemoveFavourite}
				/>
			</Document>
		);
	}
	return (
		<LoaderWrapper>
			<Loader/>
		</LoaderWrapper>
	);
}

export default enhance(DetailWrapper);

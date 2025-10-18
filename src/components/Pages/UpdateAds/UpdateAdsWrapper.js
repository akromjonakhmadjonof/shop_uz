import React from 'react';
import {compose, withHandlers} from 'recompose';
import {reset} from 'redux-form';
import Container from 'components/Container';
import {connect} from 'react-redux';
import _ from 'lodash';
import {productUpdateAction} from 'actions/products';
import useFetchList from 'hooks/useFetchList';
import {orderItemFetchAction} from 'actions/orders';
import {useParams} from 'react-router-dom';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';
import UpdateAds from './UpdateAds';
import {PRODUCT_DETAIL_URL} from 'location/routes';
import sprintf from 'sprintf';
import {appendParamsToUrl} from 'tools/url';
import {Redirect} from 'react-router';

// Enhance
const enhance = compose(
	connect((state, props) => {
		const productId = _.get(props, ['match', 'params', 'productId']);
		const data = _.get(state, ['orderItem', 'data', 'document']);
		const authData = _.get(state, ['auth', 'data']);
		const user = _.get(state, ['auth', 'data', 'id']);
		const loading = _.get(state, ['orderItem', 'loading']);
		const formValues = _.get(state, ['form', 'ProductUpdateForm', 'values']);
		return {
			authData,
			productId,
			user,
			formValues,
			loading,
			data,
		};
	}),
	withHandlers({
		onSubmitProductCreate:(props) => (e) => {
			const {
				formValues, history, dispatch, productId, user,
			} = props;
			e.preventDefault();
			const then = (r) => {
				history.push({
					pathname:sprintf(PRODUCT_DETAIL_URL, productId),
					search:appendParamsToUrl({}, history.location.search)
				});
			};
			dispatch(productUpdateAction(formValues, productId, user, then));
		},
		handleReset:(props) => () => {
			const {dispatch} = props;
			dispatch(reset('ProductUpdateForm'));
		},
	}),
);

function UpdateAdsWrapper(props) {
	const {data, loading, authData} = props;
	const {productId} = useParams();
	useFetchList({
		action:() => orderItemFetchAction(productId),
		state:'orderItem',
	});
	const id = _.toNumber(_.get(data, ['id']));
	const child = _.filter(_.get(data, ['images']), (item) => item.type === 'child');
	const avatar_2 = _.get(child, ['0']);
	const avatar_3 = _.get(child, ['1']);
	const avatar_4 = _.get(child, ['2']);
	const avatar_5 = _.get(child, ['3']);
	const avatar_6 = _.get(child, ['4']);
	const avatar_7 = _.get(child, ['5']);
	const avatar_8 = _.get(child, ['6']);
	const initialValues = {
		productType:_.get(data, ['parent', 'id']),
		productName:_.get(data, ['product', 'name']),
		price:_.get(data, ['pricing', 'sellPrice']),
		discountPrice:_.get(data, ['pricing', 'discountPrice']),
		currency:_.get(data, ['currency', 'id']),
		measurement:_.get(data, ['measurement', 'id']),
		status:_.get(data, ['product', 'status', 'id']),
		balance:_.get(data, ['product', 'balance']),
		tags:_.get(data, ['tags']),
		description:_.get(data, ['product', 'description']),
		phoneNumber:_.get(data, ['author', 'phoneNumber']),
		contactPerson:_.get(data, ['author', 'contactPerson']),
		avatar_1:_.filter(_.get(data, ['images']), (item) => item.type === 'parent')[0],
		avatar_2,
		avatar_4,
		avatar_5,
		avatar_3,
		avatar_6,
		avatar_7,
		avatar_8,
	};

	// Check mat update
	const userName = _.get(authData, ['userName']);
	const author = _.get(data, ['author', 'userName']);
	const accessToUpdate = userName === author;
	if (!loading) {
		return (
			<Container>
				{!accessToUpdate && <Redirect to={sprintf(PRODUCT_DETAIL_URL, id)}/>}
				<UpdateAds
					id={productId}
					onSubmit={props.onSubmitProductCreate}
					handleReset={props.handleReset}
					initialValues={initialValues}
				/>
			</Container>
		);
	}
	return (
		<LoaderWrapper>
			<Loader/>
		</LoaderWrapper>
	);
}

export default enhance(UpdateAdsWrapper);

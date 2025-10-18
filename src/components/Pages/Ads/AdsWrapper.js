import React from 'react';
import {compose, withHandlers} from 'recompose';
import {reduxForm, reset} from 'redux-form';
import Container from 'components/Container';
import {connect} from 'react-redux';
import _ from 'lodash';
import {productCreateAction} from 'actions/products';
import Ads from './Ads';

// Enhance
const enhance = compose(
	connect((state) => {
		const formValues = _.get(state, ['form', 'ProductCreateForm', 'values']);
		const user = _.get(state, ['auth', 'data', 'id']);
		const createLoading = _.get(state, ['product', 'create', 'loading'])
		return {
			formValues,
			createLoading,
			user,
		};
	}),
	withHandlers({
		onSubmitProductCreate:(props) => (e) => {
			const {formValues, dispatch, user} = props;
			e.preventDefault();
			dispatch(productCreateAction(formValues, user));
		},
		handleReset:(props) => () => {
			const {dispatch} = props;
			dispatch(reset('ProductCreateForm'));
		},
	}),
	reduxForm({
		form:'ProductCreateForm',
		enableReinitialize:true,
	}),
);

function AdsWrapper(props) {
	const {createLoading, formValues} = props;
	return (
		<Container>
			<Ads
				formValues={formValues}
				loading={createLoading ? 1 : 0}
				onSubmit={props.onSubmitProductCreate}
				handleReset={props.handleReset}
			/>
		</Container>
	);
}

export default enhance(AdsWrapper);

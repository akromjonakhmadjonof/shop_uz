import React from 'react';
import {compose, withHandlers} from 'recompose';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import {signInAction} from 'actions/auth';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';
import {Redirect, useHistory} from 'react-router-dom';
import {getToken} from 'tools/storage/storage';
import {MAIN_PATH} from 'location/routes';
import SignIn from './SignIn';
import {parseParams} from 'tools/url';
import {errorDialogOpen} from 'actions/dialog';
import Document from '../../Document';
import {useTranslation} from 'react-i18next';

const enhance = compose(
	connect((state) => {
		const formValues = _.get(state, ['form', 'SignInForm', 'values']);
		const loading = _.get(state, ['signIn', 'loading']);
		const token = getToken();
		return {
			formValues,
			token,
			loading,
		};
	}),
	reduxForm({
		form:'SignInForm',
		enableReinitialize:true,
	}),
	withHandlers({
		handleSignIn:(props) => (e) => {
			const {
				formValues, dispatch
			} = props;
			e.preventDefault();
			const catchError = (error) => {
				error && dispatch(errorDialogOpen(_.get(error, ['response', 'data'])));
			};
			dispatch(signInAction(formValues, catchError));
		},
	}),
);

function SignInWrapper(props) {
	const {loading, token} = props;
	const {t} = useTranslation();
	const {go} = useHistory();
	const search = _.get(props, ['location', 'search']);
	const searchObj = parseParams(search);
	const queryRedirect = _.get(searchObj, ['redirect']);
	const redirect = decodeURIComponent(queryRedirect) !== 'undefined' ? decodeURIComponent(queryRedirect) : MAIN_PATH;

	if (!loading) {
		return (
			<Document title={'shop.uz - ' + t('login')}>
				<>
					<SignIn
						handleSubmit={props.handleSignIn}
					/>
					{token && <Redirect from={'/login/'} to={redirect} exact/>}
					{token && go(0)}
				</>
			</Document>
		);
	}
	return (
		<Document title={'shop.uz - ' + t('login')}>
			<LoaderWrapper>
				<Loader/>
			</LoaderWrapper>
		</Document>
	);
}

export default enhance(SignInWrapper);

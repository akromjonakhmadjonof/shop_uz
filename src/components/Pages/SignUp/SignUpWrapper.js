import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import {signUpAction} from 'actions/auth';
import {getToken} from 'tools/storage/storage';
import {COMPLETE_SIGN_UP_URL} from 'location/routes';
import SignUp from './SignUp';

const enhance = compose(
	connect((state) => {
		const formValues = _.get(state, ['form', 'SignUpForm', 'values']);
		const token = getToken();
		return {
			token,
			formValues,
		};
	}),
	reduxForm({
		form:'SignUpForm',
		enableReinitialize:true,
	}),
	withState('face', 'setFace', null),
	withHandlers({
		handleSignUp:(props) => (e) => {
			const {
				formValues, dispatch, token, history,
			} = props;
			e.preventDefault();
			const then = () => {
				history.push({
					pathname:COMPLETE_SIGN_UP_URL,
				});
			};
			dispatch(signUpAction({...formValues}, then));
		},
	}),
);

function SignUpWrapper(props) {
	const {face, setFace, formValues} = props;
	return (
		<SignUp
			formValues={formValues}
			handleSignUp={props.handleSignUp}
			face={face}
			setFace={setFace}
		/>
	);
}

export default enhance(SignUpWrapper);

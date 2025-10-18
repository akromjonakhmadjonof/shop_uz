import React from 'react';
import Complete from './Complete';
import {compose, withHandlers} from 'recompose';
import {authAction, completeSignUpAction} from 'actions/auth';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Redirect} from 'react-router';
import {PROFILE_URL} from 'location/routes';
import useFetchList from 'hooks/useFetchList';
import * as STATE from 'store/state';

// Enhance
const enhance = compose(
	connect((state) => {
		const formValues = _.get(state, ['form', 'CompleteForm', 'values']);
		const authData = _.get(state, ['auth', 'data']);
		return {
			authData,
			formValues
		};
	}),
	withHandlers({
		handleSignUp:(props) => (e) => {
			const {
				history,
				formValues, dispatch
			} = props;
			e.preventDefault();
			const then = (data) => {
				const completed = _.get(data, ['completed']);
				completed && history.push({
					pathname:PROFILE_URL
				});
			};
			dispatch(completeSignUpAction({...formValues}, then));
		},
	}),
);

// Container
const CompleteWrapper = (props) => {
	const {authData} = props;
	// Handlers
	useFetchList({
		action:authAction,
		state:STATE.AUTH,
	});
	const userName = _.get(authData, ['userName']);
	const fullName = _.get(authData, ['fullName']);
	const phones = _.map(_.get(authData, ['phones']), (item) => {
		return {
			phone:item
		};
	});
	const completed = _.get(authData, ['completed'], false);
	const emails = _.map(_.get(authData, ['emails']), (item) => {
		return {
			phone:item
		};
	});
	const initialValues = {
		phones:phones,
		emails:emails,
		userName:userName,
		fullName:fullName,
	};
	// Render
	return (
		<>
			{completed && <Redirect to={PROFILE_URL}/>}
			<Complete
				onSubmit={props.handleSignUp}
				initialValues={initialValues}
			/>
		</>
	);
};

export default enhance(CompleteWrapper);

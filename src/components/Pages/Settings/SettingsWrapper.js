import React from 'react';
import {compose, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import Settings from './Settings';
import {userSettings} from 'actions/auth';

const enhance = compose(
	connect((state) => {
		const formValues = _.get(state, ['form', 'SettingsForm', 'values']);
		return {
			formValues,
		};
	}),
	withHandlers({
		handleSubmitSettings:(props) => (e) => {
			e.preventDefault();
			const {dispatch, formValues} = props;
			const type = _.get(formValues, ['type']);
			dispatch(userSettings(formValues, type));
		},
	}),
);

function SettingsWrapper(props) {
	return (
		<Settings
			onSubmit={props.handleSubmitSettings}
		/>
	);
}

export default enhance(SettingsWrapper);

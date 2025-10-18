import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Options from './Options';

const enhance = compose(
	connect((state) => ({
		state,
	})),
	reduxForm({
		form:'OptionsForm',
		enableReinitialize:true,
	}),
);

function OptionsWrapper(props) {
	return (
		<Options {...props} />
	);
}

export default enhance(OptionsWrapper);

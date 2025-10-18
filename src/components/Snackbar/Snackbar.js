import React, {useEffect} from 'react';
import {Snackbar as MUISnackbar} from '@material-ui/core';
import {Alert} from 'react-bootstrap';
import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import {closeSnackbarAction} from 'actions/snackbar';

const enhance = compose(
	connect((state, props) => {
		const open = _.get(state, ['snackbar', 'open']);
		const autoHideDuration = _.get(state, ['snackbar', 'autoHideDuration']);
		const message = _.get(state, ['snackbar', 'message']);
		const type = _.get(state, ['snackbar', 'type']);
		return {
			open,
			type,
			autoHideDuration,
			message,
		};
	}),
);

function Snackbar(props) {
	// Props data
	const {open, autoHideDuration, message, type} = props;
	// Hooks
	const dispatch = useDispatch();
	useEffect(() => {
		if (open) {
			const handler = setTimeout(() => {
				onClose();
			}, autoHideDuration);
			return () => {
				clearTimeout(handler);
			};
		}
	}, [open]);
	// Handlers
	const onClose = () => dispatch(closeSnackbarAction());
	// Render
	return (
		<MUISnackbar
			key={Math.random()}
			open={open}
			onClose={onClose}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{vertical:'top', horizontal:'right'}}
			message={message}
		>
			<Alert variant={type}>{message}</Alert>
		</MUISnackbar>
	);
}

export default enhance(Snackbar);

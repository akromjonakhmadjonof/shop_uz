import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import Messages from './Messages';
import {change, reduxForm} from 'redux-form';
import {useEffect, useState} from 'react';
import toCamelCase from 'tools/toCamelCase';
import {socket} from 'App';
import useMessenger from '../../../hooks/useMessenger';

const enhance = compose(
	connect((state, props) => {
		const chats = _.get(state, ['messages', 'followers', 'data', 'documents']);
		const chatsLoading = _.get(state, ['messages', 'followers', 'loading']);
		const chatId = _.get(props, ['match', 'params', 'chatId']);
		const authData = _.get(state, ['auth', 'data']);
		const formValues = _.get(state, ['form', 'MessagesForm', 'values']);
		return {
			state,
			chatsLoading,
			authData,
			chatId,
			chats,
			formValues
		};
	}),
	reduxForm({
		form:'MessagesForm',
		enableReinitialize:true,
	})
);

function MessagesWrapper(props) {
	const {formValues, authData} = props;

	const {handleTyping, chat, deleteMessage, messages, postMessage, chats, typing, handleSeen} = useMessenger()
	// Render
	return (
		<Messages
			formValues={formValues}
			handleTyping={handleTyping}
			typing={typing}
			data={messages}
			chat={chat}
			chats={chats}
			handleSeen={handleSeen}
			handleDeleteMessage={typing}
			authData={authData}
			handlePostMessage={postMessage}
		/>
	);
}

export default enhance(MessagesWrapper);

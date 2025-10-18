import _ from 'lodash';
import {useEffect, useReducer, useState} from 'react';
import {socket} from 'App';
import useHistoryObj from './useHistoryObj';
import useCompareEffect from './useCompareEffect';
import toCamelCase from 'tools/toCamelCase';
import {change} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {getDataFromState} from '../tools/get';
import {equals} from 'ramda';

const ACTION_TYPES = {
	PENDING:'pending',
	FAIL:'fail',
	SUCCESS:'success'
};

export const initialState = {
	data:null,
	error:null,
	isSuccess:false,
	isFail:false,
	isLoading:false
};

export const listReducer = (state, action) => {
	switch (action.type) {
	case ACTION_TYPES.PENDING:
		return {
			...state,
			loading:true
		};
	case ACTION_TYPES.SUCCESS:
		return {
			data:action.payload,
			error:null,
			isSuccess:true,
			isFail:false,
			loading:false
		};
	case ACTION_TYPES.FAIL:
		return {
			data:null,
			error:action.payload,
			isSuccess:false,
			isFail:true,
			loading:false
		};
	default:
		return state;
	}
};

const fetchReducer = (state, action) => listReducer(state, action);

const useMessages = () => {
	const [state, dispatch] = useReducer(fetchReducer, initialState);

	const {getParam} = useHistoryObj();

	const chat = _.toInteger(getParam('chatId'));

	useCompareEffect(() => {
		socket.emit('give_messages', {'chat_id':chat});
		dispatch({type:ACTION_TYPES.PENDING});
	}, [socket, chat]);

	useCompareEffect(() => {
		socket.on('get_messages', (data) => {
			dispatch({type:ACTION_TYPES.SUCCESS, payload:toCamelCase(data)});
		});
	}, [socket, chat]);

	useCompareEffect(() => {
		socket.on('messages_updated', () => {
			socket.emit('give_messages', {'chat_id':chat});
		});
		dispatch({type:ACTION_TYPES.PENDING});
	}, [socket, chat]);
	return {
		'messages':state
	};
};

const useChats = () => {
	const [state, dispatch] = useReducer(fetchReducer, initialState);
	const {getParam} = useHistoryObj()
	const search = getParam('search')
	useCompareEffect(() => {
		socket.emit('give_chats');
		dispatch({type:ACTION_TYPES.PENDING});
	}, [socket, search]);

	useCompareEffect(() => {
		socket.on('chats_updated', () => {
			socket.emit('give_chats');
		});
		dispatch({type:ACTION_TYPES.PENDING});
	}, [socket]);

	useCompareEffect(() => {
		socket.on('get_chats', (data) => {
			dispatch({type:ACTION_TYPES.SUCCESS, payload:toCamelCase(data)});
		});
	}, [socket]);
	return {
		'chats':state
	};
};

const useChat = () => {
	const [state, dispatch] = useReducer(fetchReducer, initialState);

	const {getParam} = useHistoryObj();

	const chat = _.toInteger(getParam('chatId'));
	const auth = useSelector(getDataFromState('auth'), equals);
	const authId = _.get(auth, ['data', 'userId'])
	const [deleted, setDeleted] = useState(false)
	useCompareEffect(() => {
		socket.emit('give_chat', {'chat_id': chat});
		dispatch({type:ACTION_TYPES.PENDING});
	}, [socket, chat]);

	useCompareEffect(() => {
		socket.on('get_chat', (data) => {
			dispatch({type:ACTION_TYPES.SUCCESS, payload:toCamelCase(data)});
		});
	}, [socket]);
	const handleDelete = (then) => {
		socket.emit('delete_chat', {'chat_id': chat})
		return socket.on('successful_deleted', () => {
			then()
		})
	}
	const userId = _.get(state, ['data', 'target', 'userId'])
	 const fixData = userId === authId ? {
		...state,
		 'data': {
			...state.data,
			 'target': _.get(state, ['data', 'user']),
			 'user': _.get(state, ['data', 'target'])
		 }
	 } : state

	return {
		'chat':fixData,
		'handleDelete': handleDelete
	};
};

const useMessaging = () => {
	const {getParam} = useHistoryObj();
	const dispatch = useDispatch();
	const chat = _.toInteger(getParam('chatId'));

	const handlePost = (e, message, replyId) => {
		e.preventDefault();
		socket.emit('message_item_create', {'message':message, 'chat_id':chat, 'reply_id':replyId});
		dispatch(change('MessagesForm', 'message', null));
	};

	const handleDeleteMessage = (messageId) => {
		socket.emit('delete_message', {'message':messageId, 'chat_id':chat});
	};
	return {
		'postMessage':handlePost,
		'deleteMessage':handleDeleteMessage
	};
};

const useTyping = () => {
	const [loading, setLoading] = useState();
	const {getParam} = useHistoryObj();
	const chat = _.toInteger(getParam('chatId'));

	const handleTyping = (e) => {
		if (e.which !== 13) {
			socket.emit('listen_typing', {'chat_id':chat, 'typing':true});
			setTimeout(() => {
				socket.emit('listen_typing', {'chat_id':chat, 'typing':false});
			}, 2000);
		}
	};

	useEffect(() => {
		socket.on('user_typing', (data) => {
			setLoading(toCamelCase(data));
		});
	}, [socket]);
	return {
		'handleTyping':handleTyping,
		'typing':loading
	};
};

const useActivity = () => {
	const {getParam} = useHistoryObj();
	const chat = _.toInteger(getParam('chatId'));
	const handleSeen = () => {
		return socket.emit('activity_item_set', {'chat_id': chat})
	}
	useEffect((e) => {
	}, [socket])
	return {
		'handleSeen': handleSeen,
	}
}

const useMessenger = () => {
	const {messages} = useMessages();
	const {chats} = useChats();
	const {postMessage, deleteMessage} = useMessaging();
	const {handleTyping, typing} = useTyping();
	const {chat, handleDelete} = useChat();
	const {handleSeen} = useActivity()
	return {
		'handleSeen': handleSeen,
		'messages':messages,
		'chat':chat,
		'deleteChat': handleDelete,
		'typing':typing,
		'chats':chats,
		'postMessage':postMessage,
		'handleTyping':handleTyping,
		'deleteMessage':deleteMessage,
	};

};

export default useMessenger;

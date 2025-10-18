import React, {useState, useEffect} from 'react';
import {compose, withHandlers, withState} from 'recompose';
import {reduxForm, reset} from 'redux-form';
import Forum from './Forum';
import {socket} from 'App';
import _ from 'lodash';
import {connect} from 'react-redux';
import toCamelCase from 'tools/toCamelCase';

// Enhance
const enhance = compose(
	connect((state) => {
		const commentForm = _.get(state, ['form', 'FAQForm']);
		return {
			commentForm
		}
	}),
	withState('reply', 'setReply', {}),
	withHandlers({
		handlePost:props => (e) => {
			e.preventDefault();
			const {commentForm, dispatch} = props;
			const comment = _.get(commentForm, ['values', 'comment']);
			comment && socket.emit('forum_post', {'message':comment});
			dispatch(reset('FAQForm'))
		}
	}),
	reduxForm({
		form:'FAQForm',
		enableReinitialize:true,
	}),
);

// Container
function ForumWrapper(props) {
	const {setReply, reply} = props
	const [forum, setForum] = useState([])
	useEffect(() => {
		socket.emit('get_forum_data')
		socket.on('give_forum_data', (data) => {
			setForum(toCamelCase(data))
		})
	}, [socket])
	useEffect(() => {
		socket.on('forum_updated', () => {
			socket.emit('get_forum_data')
		})
	}, [socket])
	// Render
	return (
		<Forum
			reply={reply}
			setReply={setReply}
			list={forum}
			onSubmit={props.handlePost}
		/>
	);
}

export default enhance(ForumWrapper);

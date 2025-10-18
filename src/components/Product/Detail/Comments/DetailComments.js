import React, {useEffect, useState} from 'react';
import Editor from './Editor';
import {compose, withHandlers, withState} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, reset} from 'redux-form';
import CommentItem from 'components/Pages/Comments/CommentItem';
import {socket} from 'App';
import toCamelCase from 'tools/toCamelCase';

const enhance = compose(
	connect((state, props) => {
		const auth = _.get(state, ['auth', 'data']);
		const loading = _.get(state, ['auth', 'loading']);
		const commentForm = _.get(state, ['form', 'ProductComments']);
		return {
			auth,
			commentForm,
			loading
		};
	}),
	withState('reply', 'setReply', {}),
	withHandlers({
		handleComment:props => (e) => {
			e.preventDefault();
			const {commentForm, productId, dispatch, reply} = props;
			const comment = _.get(commentForm, ['values', 'comment']);
			if (!_.isEmpty(reply)) {
				socket.emit('product_comment_reply', {'product':productId, 'message':comment, 'reply': _.get(reply, ['commentId'])});
			} else {
				socket.emit('product_comment', {'product':productId, 'message':comment});
			}
			socket.on('product_comment_added', () => {
				socket.emit('get_product_comments', productId);
				dispatch(reset('ProductComments'))
			})
		}
	}),
	reduxForm({
		form:'ProductComments',
		enableReinitialize:true,
	})
);

const DetailComments = (props) => {
	const {auth, productId, reply, setReply} = props;
	// Hooks
	const [comments, setComments] = useState([]);
	useEffect(() => {
		socket.emit('get_product_comments', productId);
		socket.on('give_product_comments', (data) => {
			setComments(toCamelCase(data));
		});
	}, []);

	// Data
	const authId = _.get(auth, ['userId']);

	// Render
	const commentEditor = (
		<Editor onSubmit={props.handleComment} replyData={reply}/>
	);

	// Render
	return (
		<>
			{commentEditor}
			{
				_.map(comments, (item, index) => {
					const replies = _.get(item, ['replies'])
					const repliesCount = _.size(replies);

					return (
						<>
							<CommentItem
								data={item}
								authId={authId}
								key={index}
								onReply={setReply}
							>
								{repliesCount > 0 && _.map(replies, (reply, replyIndex) => {
									return (
										<CommentItem
											withoutReply
											data={reply}
											authId={authId}
											key={replyIndex}
											onReply={setReply}
										/>
									)
								})}
							</CommentItem>
						</>
					);
				})
			}
		</>
	);
};

export default enhance(DetailComments);


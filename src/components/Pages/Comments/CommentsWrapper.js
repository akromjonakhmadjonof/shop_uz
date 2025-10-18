import React from 'react';
import Comments from './Comments';
import {useEffect, useState} from 'react';
import {socket} from 'App';
import toCamelCase from 'tools/toCamelCase';

function CommentsWrapper() {
	const [comments, setComments] = useState([])
	useEffect(() => {
		socket.emit('get_user_product_comments');
		socket.on('give_user_product_comments', (data) => {
			setComments(toCamelCase(data))
		});
	}, []);

	return (
		<Comments
			list={comments}
		/>
	);
}

export default CommentsWrapper;

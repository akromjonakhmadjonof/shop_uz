import React, {useEffect} from 'react';
import {Avatar, Comment, Tooltip} from 'antd';
import styled from 'styled-components';
import {CornerUpLeft, ThumbsDown, ThumbsUp, Trash2} from 'react-feather';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import timeFormat from 'tools/timeFormat';
import sprintf from 'sprintf';
import {USER_DETAILS_URL} from 'location/routes';
import {compose, withHandlers} from 'recompose';
import {socket} from 'App';
import {connect} from 'react-redux';

// Styles
const Wrapper = styled('div')`
  width: auto;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};

  .date-time {
    color: #666;
  }

  &:hover .delete {
    opacity: 1;
    transition: all ease 0.5s;
  }
`;

const Bottom = styled('div')`
  width: auto;
  display: flex;
  align-items: center;

  & svg {
    cursor: pointer;
  }

  & > :not(:first-child) {
    margin-left: 15px;
  }
`;

const Reply = styled('div')`
  display: flex;
  cursor: pointer;

  & svg {
    cursor: default;
  }

  align-items: center;

  & > :not(:first-child) {
    margin-left: 5px;
  }

  & p {
    margin-bottom: 0;
  }
`;

const AvatarStyled = styled(Avatar)`
  & img {
    width: 100%;
    height: 100%;
  }
`;

const Icon = styled('div')`
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 2px;
  }
`;

const Delete = styled('div')`
  min-width: 50px;
  max-width: 50px;
  cursor: pointer;
  width: 50px;
  opacity: 0;
  transition: all ease 0.5s;
`;

const enhance = compose(
	connect((state) => {
		const authId = _.get(state, ['auth', 'data', 'userId']);
		return {
			authId
		};
	}),
	withHandlers({
		handleLike:() => (comment, active, isForum) => {
			if (isForum) {
				return socket.emit(active ? 'forum_like_default' : 'forum_liked', _.toInteger(comment));
			}
			socket.emit(active ? 'comment_like_default' : 'liked_comment', _.toInteger(comment));
		},
		handleDelete:() => (comment, isForum) => {
			if (isForum) {
				return socket.emit('forum_delete', _.toInteger(comment));
			}
			socket.emit('comment_delete', _.toInteger(comment));
		},
		handleDisLike:() => (comment, active, isForum) => {
			if (isForum) {
				return socket.emit(active ? 'forum_dislike_default' : 'forum_disliked', _.toInteger(comment));
			}
			socket.emit(active ? 'comment_dislike_default' : 'disliked_comment', _.toInteger(comment));
		}
	})
);
// Component
function CommentItem({children, data, key, authId, onReply, isReply, withoutReply, isForm, ...props}) {
	const productId = _.get(data, ['product']);
	useEffect(() => {
		socket.on('comment_successful_updated', () => {
			socket.emit('get_product_comments', productId);
		});
	}, []);
	const message = _.get(data, ['message']);
	const image = _.get(data, ['author', 'image', 'src']);
	const fullName = _.get(data, ['author', 'fullName']);
	const userId = _.get(data, ['author', 'userId']);
	const commentId = isForm ? _.get(data, ['id']) : _.get(data, ['commentId']);
	const likes = _.get(data, ['likes'], []);
	const likesCount = _.size(likes);
	const dislikes = _.get(data, ['dislikes'], [])
	const dislikesCount = _.size(dislikes);
	const replies = _.get(data, ['replies'])
	const repliesCount = _.size(replies);
	const entryTime = _.get(data, ['entryTime']);
	const isLiked = likes.includes(authId)
	const isDisliked = dislikes.includes(authId)
	// Hooks
	const {t} = useTranslation();
	const getFill = (active) => {
		return active ? 'rgba(0, 0, 0, 0.45)' : '#fff'
	}
	const getStroke = (active) => {
		return active ? '#8C8C8C' : 'currentColor';
	}
	// Render
	return (
		<Wrapper>
			<Comment
				actions={!isReply ? [
					<Bottom>
						<Tooltip placement="bottom" title={t('likes')}>
							<Icon onClick={() => props.handleLike(commentId, isLiked, isForm)}>
								<ThumbsUp fill={getFill(isLiked)} stroke={getStroke(isLiked)} size={16}/>
								<span>{likesCount ? likesCount : ''}</span>
							</Icon>
						</Tooltip>
						<Tooltip placement="bottom" title={t('dislikes')}>
							<Icon onClick={() => props.handleDisLike(commentId, isDisliked, isForm)}>
								<ThumbsDown fill={getFill(isDisliked)} stroke={getStroke(isDisliked)} size={16}/>
								<span>{dislikesCount ? dislikesCount : ''}</span>
							</Icon>
						</Tooltip>
						{!withoutReply &&
							<div style={{cursor:'pointer'}} onClick={() => onReply(data)}>{t('reply_to')}</div>}
						{
							repliesCount ?
								<Tooltip placement="bottom" title={t('replied')}>
									<Reply>
										<CornerUpLeft size={16}/>
										<p>{repliesCount}</p>
									</Reply>
								</Tooltip> : ''
						}
					</Bottom>,
				] : []}
				author={<a href={sprintf(USER_DETAILS_URL, userId)}>{fullName}</a>}
				avatar={<AvatarStyled size={45} src={image} alt={fullName}/>}
				content={(
					<p>
						{message}
					</p>
				)}
				datetime={<span className={'date-time'}>{timeFormat(entryTime)}</span>}
			>
				{children}
			</Comment>
			{authId === userId && <Delete onClick={() => props.handleDelete(commentId, isForm)} className={'delete'}>
				<Trash2 stroke={'#666'}/>
			</Delete>}
		</Wrapper>
	);
}

export default enhance(CommentItem);

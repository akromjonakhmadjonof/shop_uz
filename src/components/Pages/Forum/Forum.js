import React from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Title} from 'components/Title';
import Editor from 'components/Product/Detail/Comments/Editor';
import _ from 'lodash';
import CommentItem from '../Comments/CommentItem';

// Styles
const Wrapper = styled('div')`
  width: 100%;
  padding: 0 20px;
`;
const Box = styled('div')`
  width: 100%;
  height: auto;
  padding: 0 20px;
`;

// Component
function Forum(props) {
	const {onSubmit, list, setReply, reply} = props;

	const {t} = useTranslation();
	return (
		<Container>
			<Title>
				{t('forum')}
			</Title>

			<Box>
				<Editor replyData={reply} onSubmit={onSubmit} />
			</Box>
			<Wrapper>
					{
						_.map(list, (item, index) => {
							return (
								<CommentItem data={item} onReply={setReply}  key={index} isForm />
							)
						})
					}
			</Wrapper>
		</Container>
	);
}

export default Forum;

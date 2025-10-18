import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import CommentCard from '../../CommentCard';

// Styles

const Items = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
	& > :not(:first-child) {
      margin-top: 40px;
	}
`;

const Wrapper = styled('div')`
  width: 100%;
	height: auto;
	padding: 20px;
`;

const Item = styled('div')`
  width: 50%;
`

// Component
function Comments(props) {
	// Props Data
	const {list} = props
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Items>
				{
					_.map(list, (item, index) => {
						return (
							<Item key={index}>
								<CommentCard data={item} />
							</Item>
						)
					})
				}
			</Items>
		</Wrapper>
	);
}

export default Comments;

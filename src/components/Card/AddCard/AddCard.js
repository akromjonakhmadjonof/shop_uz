import React from 'react';
import styled from 'styled-components';
import {Plus} from 'react-feather';
import {useTranslation} from 'react-i18next';

// Styles
const Wrapper = styled('div')`
  max-width: ${({theme}) => theme.card.width};
  min-width: ${({theme}) => theme.card.width};
  height: ${({theme, height}) => height || theme.card.height};
  border-radius: ${({theme}) => theme.border.radius.primary};
  display: flex;
  align-items: center;
	justify-content: center;
  position: relative;
  transition: 0.3s all ease;

  &:hover {
    box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};
    transition: 0.3s all ease;
		& > :first-child {
      opacity: 1;
      transition: 0.2s all ease;
		}
  }

  @media only screen and (max-width: 573px) {
    max-width: 300px;
  }
  cursor: ${({loading}) => (loading ? 'wait' : 'pointer')};
`;

const Box = styled('div')`
  width: auto;
  height: auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 10px;
`;

const Label = styled('p')`
  font-weight: 600;
  color: #545454;
  font-size: 22px !important;
	text-align: center;
	margin-top: 20px;
`;

// Component
function AddCard({label, handleAdd}) {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper onClick={handleAdd}>
			<Box>
				<Plus size={60} stroke="#545454"/>
				<Label>
					{t(label || 'add')}
				</Label>
			</Box>
		</Wrapper>
	);
}

export default AddCard;

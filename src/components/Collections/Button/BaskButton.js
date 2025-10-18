import React from 'react';
import styled from 'styled-components';
import Buy from 'media/icons/buy/buy';
import {useTranslation} from 'react-i18next';

const Button = styled('div')`
  width: auto;
  font-style: normal;
  position: relative;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({theme}) => theme.color.dark.dark_grey};

  & > :first-child {
    margin-right: 7px;
  }
`;

function BaskButton(props) {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Button {...props}>
			<div>
				<Buy/>
			</div>
			<div>{t('basket')}</div>
			{props.children}
		</Button>
	);
}

export default BaskButton;

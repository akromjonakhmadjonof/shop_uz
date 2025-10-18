import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import Heart from 'media/icons/Heart';
import {FAVOURITES_URL} from 'location/routes';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getStorage} from 'tools/storage/storage';
import * as STATE from 'constants/stateNames';
import _ from 'lodash';

// Style
const Button = styled('div')`
	margin-right: 25px;
  width: auto;
	position: relative;
  font-style: normal;
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

const Length = styled('div')`
  width: 30px;
  height: 20px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.background.light.action};
  display: flex;
  align-items: center;
  top: -15px;
  justify-content: center;
  position: absolute;
  color: #fff;
  right: -25px;
`;

// Enhance
const enhance = compose(
	connect(() => {
		const cart = JSON.parse(getStorage(true).getItem(STATE.FAVOURITES)) || [];
		const cartLength = _.size(cart);
		return {
			cartLength,
		};
	}),
);

// Component
function FavouriteButton(props) {
	const {cartLength} = props;
	// Hook
	const {t} = useTranslation();
	// Render
	return (
		<Tooltip title={t('navbar_favourites')} placement="bottom">
			<Link to={FAVOURITES_URL}>
				<Button {...props}>
					<div>
						<Heart/>
					</div>
					<div>{t('navbar_favourites')}</div>
					{cartLength !== 0 && (
						<Length>
							{cartLength}
						</Length>
					)}
				</Button>
			</Link>
		</Tooltip>
	);
}

export default enhance(FavouriteButton);

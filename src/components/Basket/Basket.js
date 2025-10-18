import React, {useState} from 'react';
import {BaskButton} from 'components/Collections/Button';
import styled from 'styled-components';
import $ from 'jquery';
import {X,} from 'react-feather';
import {useTranslation} from 'react-i18next';
import {Button, Drawer, Tooltip,} from 'antd';
import _ from 'lodash';
import Empty from 'components/Empty';
import arrow from 'media/images/arrow.svg';
import {useHistory} from 'react-router-dom';
import {BASKET_URL} from 'location/routes';
import numberFormat from '../../tools/numberFormat';
import BasketItem from '../BasketItem';

const Header = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled('h1')`
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0;
  font-size: 27px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #333333;
`;

const Icon = styled('div')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const Footer = styled('div')`
  width: 100%;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #E4E4E4;
`;

const TotalPrice = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 15px;
  }

  & > :last-child {
    margin-left: 15px;
  }

  & p {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 129.96%;
    display: flex;
    align-items: center;
    letter-spacing: 0.005em;
    margin-bottom: 0;
    color: #333333;
    mix-blend-mode: normal;
  }
`;

const ButtonGo = styled(Button)`
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 129.96%;
  text-align: center;
  letter-spacing: -0.005em;
  color: #FFFFFF !important;
  outline: none !important;
  background: #4F71DC !important;
  border: none !important;
  border-radius: 5px;
  margin-top: 20px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > :last-child {
    margin-left: 10px;
    margin-top: 3px;
  }

  &:after {
    display: none;
  }
`;

const List = styled('div')`
  height: 75vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

function Basket(props) {
	// Props data
	const {length, products, sum, usd, rub} = props;
	// Hooks
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const {t} = useTranslation();

	// Handlers
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		$('body').css('overflow', 'auto');
	};

	const title = (
		<Header>
			<Title>
				{t('basket')}
			</Title>
			<Icon onClick={handleClose}><X/></Icon>
		</Header>
	);

	// Render
	return (
		<>
			<Tooltip title={t('basket')} placement="bottomLeft">
				<BaskButton onClick={() => handleOpen()}>
					{length !== 0 && (
						<Length>
							{length}
						</Length>
					)}
				</BaskButton>
			</Tooltip>
			<Drawer
				visible={open}
				width={530}
				title={title}
				closable={false}
				zIndex={100000}
				onClose={handleClose}
			>
				{!_.isEmpty(products) &&
					(
						<List>
							{
								_.map(products, (item) => {
									return (
										<BasketItem data={item}/>

									);
								})
							}
						</List>
					)
				}
				{
					_.isEmpty(products) && <Empty/>
				}
				<Footer>
					<TotalPrice>
						{sum !== 0 && <p>{numberFormat(sum, 'uzs')}</p>}
						{usd !== 0 && <p>{numberFormat(usd, '$')}</p>}
						{rub !== 0 && <p>{numberFormat(rub, 'руб')}</p>}
					</TotalPrice>
					<ButtonGo onClick={() => {
						history.push(BASKET_URL);
						setOpen(false);
					}}
					>
						{t('go_to_cart')}
						<img src={arrow} alt=""/>
					</ButtonGo>
				</Footer>
			</Drawer>
		</>
	);
}

export default Basket;

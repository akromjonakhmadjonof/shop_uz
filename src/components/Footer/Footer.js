import React from 'react';
import Container from 'components/Container';
import {Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import Logo from 'media/icons/logo';
import _ from 'lodash';
import {footer} from 'constants/footer';
import {Button} from '@material-ui/core';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const Wrapper = styled('div')`
  width: 100%;
  padding: 57px 0 54px;
  border-top: 1px solid #e1e1e1;
  background: ${({theme}) => theme.background.primary};
`;

const LogoTitle = styled('a')`
  padding: 5px 5px 23px 0;
  display: block;
`;

const Menu = styled('ul')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MenuTitle = styled('li')`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 26px;
  text-transform: uppercase;
  color: #222C46;
`;

const MenuItem = styled('a')`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 40px;
  color: ${({theme}) => theme.color.grey};
`;

const Buttons = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 47px;
  @media only screen and (max-width: 995px) {
    width: 100%;
    justify-content: space-between;
    & button {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const CustomButton = styled(Button)`
  text-transform: inherit !important;
  padding: 0 !important;
  margin: 0 14px;
`;

const Access = styled('div')`
  width: 100%;
  margin-top: 90px;
  display: flex;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
    & > :first-child {
      margin-bottom: 15px;
    }
  }
  align-items: center;
  justify-content: space-between;
`;

const Text = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  padding: 3px 5px 3px 0;
  margin: 0;
  line-height: 17px;
  color: ${({theme}) => theme.color.grey};
`;

const menu = (menu) => {
	const {t} = useTranslation();
	const title = _.get(menu, ['title']);
	const items = _.get(menu, ['items']);
	return (
		<Menu>
			<MenuTitle>
				{t(title)}
			</MenuTitle>
			{
				_.map(items, (item, key) => (
					<MenuItem href={_.get(item, ['href'])} key={key}>
						{t(_.get(item, ['label']))}
					</MenuItem>
				))
			}
		</Menu>
	);
};

function Footer() {
	// Hooks
	const {t} = useTranslation();

	// Render
	return (
		<Wrapper>
			<Container>
				<Row className="footer-row">
					<Col className="footer-mb-25" xs={12} lg={4} md={12}>
						<LogoTitle href="/">
							<Logo/>
						</LogoTitle>
					</Col>
					{
						_.map(footer, (item, key) => (
							<Col lg={4} md={6} xs={12} key={key}>
								{menu(item)}
							</Col>
						))
					}
					{/* <Col xs={12}> */}
					{/* <Buttons> */}
					{/*	 <CustomButton> */}
					{/*		 <GooglePlay/> */}
					{/*	 </CustomButton> */}
					{/*	 <CustomButton> */}
					{/*		 <AppStore/> */}
					{/*	 </CustomButton> */}
					{/* </Buttons> */}
					{/* </Col> */}
					<Col xs={12}>
						<Access>
							<Text>
								© 2021-
								{moment().format('YYYY')}
								{' '}
								ООО «shop.uz»
							</Text>
							<Text>{t('all_reversed')}</Text>
						</Access>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
}

export default Footer;

import React, {useState} from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Location from 'media/icons/location';
import Link from 'components/Link';
import {Col, Row} from 'react-bootstrap';
import Logo from 'media/icons/logo';
import {AuthButton, MailButton} from 'components/Collections/Button';
import Horizontal from 'components/Scroller/Horizontal';
import _ from 'lodash';
import {category} from 'constants/category';
import sprintf from 'sprintf';
import {CASHBACK_URL, CATEGORY_URL, FOR_BUSINESS_URL, FORUM_URL,} from 'location/routes';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Tooltip} from 'antd';
import Language from 'components/Dropdown/Language';
import CategoryItem from './Category';
import Search from './Search';
import BasketWrapper from 'components/Basket';

const Wrapper = styled('div')`
  width: 100%;
  z-index: 3;
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
  background: ${({theme}) => theme.background.primary};

  @media only screen and (max-width: 1180px) {
    .none {
      display: none;
    }

    .block {
      display: block;
    }
  }
  @media only screen and (min-width: 1180px) {
    .none {
      display: none;
    }

    .block {
      display: block;
    }
  }

`;

const MenuText = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.005em;
  color: #69707E;
  margin: 0;
`;

const Box = styled('div')`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > :not(:first-child) {
    margin-left: 41px;
  }
`;

const Menu = styled('div')`
  display: flex;
  align-items: center;
  padding: 15px 0 7px 0;
  justify-content: space-between;
`;

const Bar = styled('div')`
  padding: 17px 0;
`;

const CustomRow = styled(Row)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Flex = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CustomButtons = styled('div')`
  display: flex;
  min-width: 400px;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrap = styled('div')`
  min-width: 200px;
`;

// Functions
const menu = () => {
	const {t} = useTranslation();
	return (
		<Menu className="menu-column">
			<Box>
				<Link href={FORUM_URL}>
					<Tooltip title={t('navbar_faq')} placement="bottomRight">
						<MenuText>{t('navbar_faq')}</MenuText>
					</Tooltip>
				</Link>
				<Link href={FOR_BUSINESS_URL}>
					<Tooltip title={t('navbar_for_business')} placement="bottomRight">
						<MenuText>{t('navbar_for_business')}</MenuText>
					</Tooltip>
				</Link>
				<Link href={CASHBACK_URL}>
					<Tooltip title={t('discounts')} placement="bottomRight">
						<MenuText>{t('discounts')}</MenuText>
					</Tooltip>
				</Link>
			</Box>
			<Box>
				<Language/>
			</Box>
		</Menu>
	);
};

// Component
function Navbar() {
	// Hooks
	const location = useLocation();
	const {t} = useTranslation();
	const [coords, setCoords] = useState()
	// Props data
	const {pathname} = location;

	// Data
	const mappedItems = _.map(category, (item) => {
		const label = _.get(item, ['label']);
		const id = _.get(item, ['id']);
		const categoryId = _.get(item, ['href']);
		const cleanUrl = sprintf(CATEGORY_URL, categoryId);
		const icon = _.get(item, ['icon']);
		return (
			<CategoryItem
				currentLocation={pathname}
				key={id}
				icon={icon}
				href={cleanUrl}
			>
				{t(label)}
			</CategoryItem>
		);
	});

	navigator.geolocation.getCurrentPosition(function(position) {
		setCoords({
			lat: position.coords.latitude,
			long: position.coords.longitude
		})
	});

	// Render
	return (
		<Wrapper>
			<Container>
				<CustomRow>
					<Col xs={12}>
						{menu()}
					</Col>
				</CustomRow>
				<Bar>
					<Flex style={{justifyContent:'space-between'}}>
						<LogoWrap>
							<Tooltip placement="right" title="shop.uz e-Commerce...">
								<Link href="/">
									<Logo/>
								</Link>
							</Tooltip>
						</LogoWrap>
						<Search/>
						<CustomButtons>
							<AuthButton/>
							<BasketWrapper/>
							<MailButton/>
						</CustomButtons>
					</Flex>
				</Bar>
				<Bar style={{padding:'0'}}>
					<Horizontal>
						{mappedItems}
					</Horizontal>
				</Bar>
			</Container>
		</Wrapper>
	);
}

export default Navbar;

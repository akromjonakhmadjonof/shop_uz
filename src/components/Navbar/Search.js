import {Tooltip} from 'antd';
import React, {useState} from 'react';
import styled from 'styled-components';
import SearchIcon from 'media/icons/search/search';
import {useTranslation} from 'react-i18next';
import {X} from 'react-feather';
import {compose} from 'recompose';
import useFetchList from 'hooks/useFetchList';
import {productsListFetchAction} from 'actions/products';
import _ from 'lodash';
import * as STATE from 'store/state';
import {connect} from 'react-redux';
import numberFormat from 'tools/numberFormat';
import sprintf from 'sprintf';
import * as PATH from 'location/routes';
import Link from 'components/Link';
import DebounceSearch from 'components/Fields/DebounceSearch';
import Animate from 'components/Loader/Animate';

const enhance = compose(
	connect((state) => {
		const products = _.get(state, ['homeProducts', 'data', 'documents']);
		const loading = _.get(state, ['homeProducts', 'loading']);
		return {
			products,
			loading
		};
	})
);

// Styles
const Wrapper = styled('div')`
  position: fixed;
  top: 72px;
  left: 255px;
  z-index: -1;
  display: none;
  width: 0;
  opacity: 0;
  transition: 0.1s all ease;
  height: 0;
  &.active {
	display: block;
    opacity: 1;
    background: #00000072;
    z-index: 2000;
    width: 100%;
    height: 100%;
    transition: 0.1s all ease;
    left: 0;
    top: 0;
  }
`;

const Label = styled('label')`
  background: #F9F9F9;
  width: 90%;
  margin-right: 20px;
  border: 1px solid #DFE0E3;
  box-sizing: border-box;
  height: 50px;
  border-radius: 11px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: ${({fullWidth}) => (fullWidth ? 'space-between' : '')};
  padding-right: ${({fullWidth}) => (fullWidth ? '20px' : '0')};
  @media only screen and (max-width: 680px) {
    width: 90%;
    margin-left: auto;
  }
  @media only screen and (max-width: 578px) {
    width: 100%;
    margin-top: 40px;
  }

  & svg {
    color: #69707E;
    margin-left: 7px;
    margin-bottom: 3px;
  }
`;

const Input = styled('input')`
  border: none;
  outline: none;
  width: 90%;
  height: 100%;
  background: inherit;
  transition: all 0.2s ease-in-out 0s;
  appearance: none !important;
  visibility: visible;
  padding: 18px;

  &:placeholder-shown {
    transition: all 0.2s ease-in-out 0s;
  }

  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: -0.005em;
    color: #69707E;

  }
`;

const Popup = styled('div')`
  min-width: 200px;
  width: 50%;
  position: relative;
  margin: 90px auto auto auto;

  & > :nth-child(2) {
    width: 100% !important;
  }
`;

const Icon = styled('div')`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: -40px;
  right: 0;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const List = styled('ul')`
  width: 100%;
  background: #F9F9F9;
  border-radius: 11px;
  padding: 10px 10px 0 10px;
  margin-top: 10px;
  height: 650px;
  overflow: scroll;
  & > :not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
  }

  &.loader {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > :not(:first-child) {
    margin-top: 10px;
  }

  border: 1px solid #DFE0E3;
`;

const Item = styled('li')`
  width: 100%;
  position: relative;
  cursor: pointer;
  min-height: 60px;
  max-height: 60px;
  padding-bottom: 10px;
  display: flex;

  &:active {
    background: ${({theme}) => theme.background.active};
  }
`;

const Image = styled('div')`
  min-width: 60px;
  max-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled('p')`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 16px;
`;

const RightSide = styled('div')`
  width: auto;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
`;

const Description = styled('p')`
  mix-blend-mode: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const About = styled('div')`
  width: 85%;
`;

const Price = styled('div')`
  width: 15%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

// ComponentSearch
const Search = (props) => {
	// Props data
	const {products, loading} = props;

	// Hooks
	const {t} = useTranslation();
	const [searchOpen, setSearchOpen] = useState(false);

	// Handlers
	useFetchList({
		action:productsListFetchAction,
		state:STATE.HOME_LIST,
		pickParams:['search']
	});

	// Style Objects
	const link = {
		position:'absolute',
		top:'0',
		left:'0',
		width:'100%',
		height:'100%'
	};
	const input = {
		width:'100%',
		border:'none',
		background:'#F9F9F9'
	};
	// Render
	return (
		<>
			<Wrapper className={searchOpen ? 'active' : ''}>
				<Popup>
					<Icon onClick={() => setSearchOpen(false)}>
						<X size={18}/>
					</Icon>
					<Label fullWidth>
						<DebounceSearch inputStyles={input} placeholder={`${t('navbar_search')}...`}/>
						<div>
							<SearchIcon/>
						</div>
					</Label>
					{!loading && <List>
						{
							_.map(products, (product, index) => {
								const sellPrice = _.get(product, ['pricing', 'sellPrice']);
								const productName = _.get(product, ['product', 'name']);
								const productDescription = _.get(product, ['product', 'description']);
								const discountPrice = _.get(product, ['pricing', 'discountPrice']);
								const currencySymbol = _.get(product, ['currency', 'symbol']);
								const image = _.get(product, ['images', '0', 'src']);
								const id = _.toNumber(_.get(product, ['id']));
								const parent = _.get(product, ['parent', 'label']);
								const author = _.get(product, ['author', 'id'])
								return (
									<Item key={index}>
										<Link onClick={() => setSearchOpen(false)}
											  href={sprintf(PATH.PRODUCT_DETAIL_URL, parent, Number(author), Number(id))} styles={link}/>
										<Image>
											<img src={image} alt=""/>
										</Image>
										<RightSide>
											<About>
												<Name>
													{productName}
												</Name>
												<Description>
													{productDescription}
												</Description>
											</About>
											<Price>
												<p>
													{numberFormat(Number(sellPrice) - Number(discountPrice), currencySymbol)}
												</p>
											</Price>
										</RightSide>
									</Item>
								);
							})
						}
					</List>}
					{loading && <List className={'loader'}><Animate/></List>}
				</Popup>
			</Wrapper>
			<Label fullWidth onClick={() => setSearchOpen(true)}>
				<Input placeholder={`${t('navbar_search')}...`}/>
				<Tooltip title={`${t('navbar_search')}...`} placement="topLeft">
					<div>
						<SearchIcon/>
					</div>
				</Tooltip>
			</Label>
		</>
	);
};

export default enhance(Search);

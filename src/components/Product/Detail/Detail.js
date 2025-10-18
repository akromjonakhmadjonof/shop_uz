import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Next from 'media/icons/next';
import Link from 'components/Link';
import {Alert, Col, Row} from 'react-bootstrap';
import _ from 'lodash';
import {Button} from '@material-ui/core';
import Star from 'media/icons/star/Star';
import Ticket from 'media/icons/ticket';
import Heart from 'media/icons/Heart';
import {ChevronLeft, ChevronRight, Edit3} from 'react-feather';
import numberFormat from 'tools/numberFormat';
import {Carousel, Tag} from 'antd';
import {useTranslation} from 'react-i18next';
import Description from 'components/Description';
import dateTimeFormat from 'tools/dateTimeFormat';
import moment from 'moment';
import normalizePhone from 'tools/normalizePhone';
import {category} from 'constants/category';
import {useHistory} from 'react-router-dom';
import sprintf from 'sprintf';
import * as PATH from 'location/routes';
import Slider from 'react-slick';
import CardWrapper from 'components/Product/Card';
import DetailComments from './Comments';
import dayDiff from 'tools/dayDiff';

const Wrapper = styled('div')`
  width: 100%;

  .ant-carousel .slick-dots {
    margin: 0 !important;
  }

  .ant-carousel .slick-dots-bottom {
    bottom: 23px;
  }

  .slick-dots.slick-dots-bottom {
    display: flex !important;
    align-items: center;

    & > li {
      width: 15px !important;

      & > button {
        width: 10px;
        border: 2px solid #333;
        height: 10px;
        border-radius: 50%;
      }
    }
  }
`;

const Location = styled('ul')`
  display: flex;
  align-items: center;
  height: 100%;

  & svg {
    width: 6px;
    height: 11px;
  }

  & > :not(:last-child) {
    & svg {
      stroke: #333333;
    }
  }
`;

const LocationItem = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.005em;
  color: #333333;
`;

const About = styled('div')`
  width: 100%;
  height: 100%;
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Sell = styled('div')`
  width: 52px;
  height: 25px;
  background: #F61B58;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 3px 9px;
  margin-right: 10px;

`;

const Action = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 8px 4px;
  width: 78px;
  height: 25px;
  background: #FFFFFF;
  border: 1px solid #F61B58;
  color: #F61B58;
  text-transform: lowercase;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Buttons = styled('div')`
  display: flex;
`;

const ProductCode = styled('div')`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.005em;
  color: #69707E;

  & span {
    margin-left: 6px;
  }
`;

const Title = styled('h1')`
  font-style: normal;
  font-weight: 600;
  font-family: var(--semi-bold) !important;
  font-size: 32px;
  line-height: 41px;
  letter-spacing: -0.025em;
  color: #282828;
  margin-top: 14px;
`;

const Stars = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 14px;

  & > :not(:last-child) {
    margin-right: 5px;
  }
`;

const SubTitle = styled('h2')`
  font-style: normal;
  font-size: 24px;
  line-height: 41px;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: #282828;
  margin-top: 14px;
`;

const ProdDescription = styled('textarea')`
  width: 100%;
  height: 300px;
  appearance: none !important;
  visibility: visible;
  outline: none;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 14px;
  background: #fafafa;
  font-size: 16px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Price = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 129.96%;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: #333333;
  margin-bottom: 12px;
  mix-blend-mode: normal;

  .measurement {
    margin-left: 4px;
  }
`;

const DiscountPrice = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  margin-left: 20px;
  line-height: 129.96%;
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  letter-spacing: 0.005em;
  color: #69707E;
  mix-blend-mode: normal;
  position: relative;

  .measurement {
    margin-left: 4px;
  }

  &:before {
    position: absolute;
    content: '';
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    background-color: ${({theme}) => theme.background.light.action};
  }
`;

const DFlex = styled('div')`
  display: flex;
  align-items: center;
`;

const Cashback = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  margin-left: 5px;
  line-height: 135%;
  letter-spacing: -0.5px;
  font-feature-settings: 'tnum' on;
  color: #69707E;
  margin-bottom: 0;
`;

const CartButton = styled(Button)`
  text-transform: initial !important;
  font-family: var(--base-font-family) !important;
  background: #4F71DC !important;
  border-radius: 5px;
  color: ${({theme}) => theme.color.light.white};
  width: 86% !important;
  margin-top: 15px;
  height: 56px !important;
  font-size: 16px !important;
`;

const FavouriteButton = styled(Button)`
  text-transform: initial !important;
  font-family: var(--base-font-family) !important;
  border: 1px solid #F61B58 !important;
  border-radius: 5px;
  color: ${({theme}) => theme.color.light.white};
  width: 12% !important;
  height: 56px !important;
  margin-top: 15px;
  font-size: 16px !important;
  z-index: 100;

  &.is-favourite {
    border: 1px solid #F61B58 !important;
    z-index: 100;

    & svg {
      fill: #F61B58;
    }

    & svg > :first-child {
      stroke: #F61B58 !important;
    }

    & svg > :last-child {
      stroke: white !important;
    }
  }

  & svg {
    fill: white;
  }

  & svg path {
    stroke: #F61B58 !important;
  }
`;

const Content = styled('div')`
  width: 90% !important;
  min-height: 485px;
  height: 485px;

  & img {
    width: 100%;
    object-fit: contain;
    height: 100%;
  }

  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #fff;
`;

const CarouselStyled = styled(Carousel)`
  margin-top: 20px;
`;

const DetailRow = styled(Row)`
  @media only screen and (max-width: 1150px) {
    flex-direction: column;

    & > * {
      & > .ant-carousel .slick-slider {
        width: 100% !important;
      }

      width: 100%;
    }

    & > :first-child {
      margin-bottom: 35px;
    }
  }
`;

const CustomRow = styled(Row)`
  margin-top: 20px;

  & > * {
    display: flex;
    align-items: flex-start;
  }

  @media only screen and (max-width: 768px) {
    & > :first-child {
      margin-bottom: 35px !important;
    }

    & > * {
      & > * {
        width: 100% !important;
        justify-content: center;
      }
    }
  }

  & > :first-child {
    justify-content: flex-start;
  }

  & > :last-child {
    justify-content: flex-end;
  }
`;

const DetailItem = styled('div')`
  width: 98%;

  & > :first-child {
    margin-bottom: 16px;
  }

  min-height: 160px;
  height: 100%;
  border-radius: 14px;
  background: #F9F9F9;
  padding: 20px;
  border: 1px solid #e1e1e1;
`;

const ItemTitle = styled('p')`
  font-style: normal;
  font-weight: 600;
  margin-top: ${({mt}) => mt || 0};
  font-size: 18px;
  line-height: 145%;
  margin-bottom: 0;
  letter-spacing: 0.5px;
  color: #333333;
  mix-blend-mode: normal;
`;

const View = styled('span')`
  color: #4F71DC !important;
  font-weight: 500;
  cursor: pointer;

  &.center {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: center;

    & > p {
      margin-bottom: 0;
    }
  }
`;

const ViewProfile = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: center;

  & > p {
    margin-bottom: 0;
  }
`;

const Tags = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px !important;

  & > * {
    margin: 5px;
    padding: 5px 10px;
    font-size: 16px;
  }
`;

const Information = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${({theme}) => theme.border.color.primary};
  margin-bottom: -20px;
  justify-content: space-between;

  & p {
    margin-bottom: 0;
  }

  & > :last-child > div {
    display: flex;

    & a {
      color: ${({theme}) => theme.background.light.action} !important;
    }

    justify-content: flex-end !important;
  }

  & > :nth-child(2) > div {
    display: flex;
    justify-content: center !important;
  }
`;

const Parent = styled('p')`
  line-height: 145%;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #333333;
  ${({styles}) => styles}
`;

const Inform = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 15px;
  }
`;

const EditWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;
    cursor: pointer;
  }
`;

const Arrow = styled('div')`
  width: 38px;
  height: 38px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: #ece9e9 !important;
  border-radius: 50%;

  &:before {
    display: none;
  }

  &.slick-disabled {
    opacity: 0.5;
  }
`;

const Recommend = styled('div')`
  padding: 20px 0;

  .slick-track {
    padding: 20px 0;
  }

  .slick-dots {
    display: none !important;
  }

  padding: 20px 0;

  .slick-track {
    padding: 20px 0;
  }

  .slick-dots {
    display: none !important;
  }
`;

const DeleteButton = styled(Alert)`
  margin-bottom: 0 !important;
  height: 56px;
  margin-top: 15px;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgb(58 58 68 / 24%), 0 1px 2px rgb(90 91 106 / 24%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
`;

function Detail(props) {
	// Props data
	const {
		visitors,
		recommendation,
		accessToUpdate,
		handleAdd,
		recommendationByAuthor,
		handleDelete,
		isSelected,
		product,
		handleAddToFavourites,
		handleRemoveFavourite,
	} = props;
	// Data
	const images = _.get(product, ['images']);
	const id = _.get(product, ['id']);
	const productTags = _.get(product, ['tags']);
	const title = _.get(product, ['product', 'name']);
	const description = _.get(product, ['product', 'description']);
	const sellPrice = _.get(product, ['pricing', 'sellPrice']);
	const discountPrice = _.get(product, ['discountPrice', 'sellPrice']);
	const discountPercent = _.get(product, ['discountPrice', 'discountPercent']);
	const createdDate = _.get(product, ['createdDate']);
	const currency = _.get(product, ['currency', 'symbol']);
	const parent = _.get(product, ['parent', 'label']);
	const current = _.filter(category, (item) => item.label === parent)[0];
	const favourite = _.get(product, ['favourite']);
	const contactPerson = _.get(product, ['author', 'additional', 'additionalName']);
	const phoneNumber = _.get(product, ['author', 'phones', '0']);
	const email = _.get(product, ['author', 'emails', '0']);
	const authorId = _.get(product, ['author', 'id']);
	const isNew = dayDiff(createdDate) > -31;
	// Hooks
	const {t} = useTranslation();
	const history = useHistory();

	// Handlers
	const handleOpenEdit = () => {
		history.push(sprintf(PATH.UPDATE_ADS_URL, id));
	};
	const handleGoProfile = () => {
		history.push({
			pathname:sprintf(PATH.USER_DETAILS_URL, authorId)
		});
	};
	const getSettings = (data) => {
		const size = _.size(data);
		return {
			dots:false,
			infinite:false,
			speed:500,
			slidesToShow:size > 4 ? 4 : size,
			slidesToScroll:4,
			initialSlide:0,
			prevArrow:<Arrow><ChevronLeft stroke={'#333'}/></Arrow>,
			nextArrow:<Arrow><ChevronRight stroke={'#333'}/></Arrow>,
			responsive:[
				{
					breakpoint:1024,
					settings:{
						slidesToShow:3,
						slidesToScroll:3,
						infinite:true,
						dots:true
					}
				},
				{
					breakpoint:600,
					settings:{
						slidesToShow:2,
						slidesToScroll:2,
						initialSlide:2
					}
				},
				{
					breakpoint:480,
					settings:{
						slidesToShow:1,
						slidesToScroll:1
					}
				}
			]
		};
	}
	// Data
	const location = (
		<Row style={{marginBottom:'20px', marginTop:'-20px'}}>
			<Col xs={11}>
				<Location>
					<LocationItem href="/">
						{t('home')}
						<Next/>
					</LocationItem>
					<LocationItem href={`/category/${_.get(current, ['href'])}`}>
						{t(parent)}
						<Next/>
					</LocationItem>
					<LocationItem href="#">
						{title}
						<Next/>
					</LocationItem>
				</Location>
			</Col>
			{accessToUpdate && <Col xs={1}>
				<EditWrapper>
					<div onClick={handleOpenEdit}>
						<Edit3 stroke="#333"/>
					</div>
				</EditWrapper>
			</Col>}
		</Row>
	);

	const tags = (
		<>
			<ItemTitle mt="15px">
				{t('tags')}
			</ItemTitle>
			<Tags>
				{
					_.map(productTags, (item, key) => (
						<Tag key={key}>{item}</Tag>
					))
				}
			</Tags>
		</>
	);
	const slider = (
		<>
			<CarouselStyled autoplay onChange={(v) => console.log(v)} style={{width:'90%'}}>
				{
					_.map(images, (item, key) => {
						const src = _.get(item, ['src']);
						const file = _.get(item, ['fileName']);
						return (
							<Content key={key}>
								<img src={src} alt={file}/>
							</Content>
						);
					})
				}
			</CarouselStyled>
			{!_.isEmpty(productTags) && tags}
		</>
	);
	const about = (
		<About>
			<Header>
				<Buttons>
					{discountPercent && discountPercent !== 0 && (
						<Sell>
							-
							{numberFormat(discountPercent)}
							%
						</Sell>
					)}
					{isNew &&
						<Action>
							новинка
						</Action>
					}
				</Buttons>
			</Header>
			<Title>
				{title}
			</Title>
			<Stars>
				<Star fontSize="20px"/>
				<Star fontSize="20px"/>
				<Star fontSize="20px"/>
				<Star fontSize="20px"/>
				<Star fontSize="20px"/>
			</Stars>
			{discountPrice && discountPrice !== 0 && (
				<DFlex style={{marginTop:'15px'}}>
					<Price>
						{numberFormat(discountPrice)}
						{' '}
						<span className="measurement">{currency}</span>
					</Price>
					<DiscountPrice>
						{numberFormat(sellPrice)}
						{' '}
						<span className="measurement">{currency}</span>
					</DiscountPrice>
				</DFlex>
			)}
			<DFlex style={{marginTop:'15px'}}>
				<Price>
					{numberFormat(sellPrice)}
					{' '}
					<span className="measurement">{currency}</span>
				</Price>
			</DFlex>
			{discountPrice && discountPrice !== 0 && (
				<DFlex style={{marginBottom:'15px'}}>
					<Ticket/>
					<Cashback>
						вы получите кэшбек
						(
						{numberFormat(discountPercent)}
						%)
						{numberFormat(sellPrice - discountPrice)}
						{' '}
						{currency}
					</Cashback>
				</DFlex>
			)}
			<SubTitle>
				Описание товара
			</SubTitle>
			<ProdDescription value={description} readOnly/>
			<DFlex style={{width:'100%', justifyContent:'space-between'}}>
				{
					!isSelected
						? (
							<CartButton onClick={() => handleAdd(product)}>
								Добавить в корзину
							</CartButton>
						)
						: (
							<DeleteButton variant="success" onClick={() => handleDelete(id)}>
								{t('already_added')}
							</DeleteButton>
						)
				}
				{
					favourite
					&& (
						<FavouriteButton onClick={() => handleRemoveFavourite(product)} className="is-favourite">
							<Heart/>
						</FavouriteButton>
					)
				}
				{
					!favourite
					&& (
						<FavouriteButton onClick={() => handleAddToFavourites(product)}>
							<Heart/>
						</FavouriteButton>
					)
				}
			</DFlex>
		</About>
	);
	const detail = (
		<DetailRow>
			<Col xs={6}>
				{slider}
			</Col>
			<Col xs={6}>
				{about}
			</Col>
		</DetailRow>
	);

	const more = (
		<CustomRow>
			<Col xs={12} lg={6} md={6}>
				<DetailItem>
					<ItemTitle>
						{t('user')}
					</ItemTitle>
					<Description parent={t('contact_person')} child={contactPerson}/>
					<Description parent={t('last_seen')} child={dateTimeFormat(moment())}/>
					<Description parent={t('mobile_phone')} child={normalizePhone(phoneNumber)}/>
					<Description parent={t('email')} child={email}/>
					<ViewProfile onClick={handleGoProfile} className={'center'}><p>{t('view_profile') + ' . . .'}</p>
					</ViewProfile>
				</DetailItem>
			</Col>
			<Col xs={12} lg={6} md={6}>
				<DetailItem>
					<ItemTitle>
						{t('location')}
					</ItemTitle>
					<Description parent={t('country')} child="Uzbekistan"/>
					<Description parent={t('city')} child="Tashkent"/>
					<Description parent={t('location')} child="Chilanzar 12.st 23"/>
					<Description parent={t('view_map')} child={<View>{t('view')}</View>}/>
				</DetailItem>
			</Col>
		</CustomRow>
	);

	const recommend = (data, isAuthor) => {
		return (
			<Recommend style={{padding: isAuthor && '0px'}} className={!isAuthor ? 'mt-85' : ''}>
				<SubTitle>{isAuthor ? t('user_other_posts') : t('recommend')}</SubTitle>
				<Slider className={'custom-slider'} {...getSettings(data)}>
					{
						_.map(data, (item, key) => {
							return (
								<CardWrapper product={item} key={key}/>
							);
						})
					}
				</Slider>
			</Recommend>
		);
	};

	// Render
	return (
		<Wrapper>
			<Container>
				{location}
				{detail}
				{more}
				<Information>
					<Col xs={4}>
						<Inform>
							<Parent>
								{t('created_date')}
								:
							</Parent>
							<ItemTitle style={{fontSize:'16px'}}>
								{dateTimeFormat(createdDate)}
							</ItemTitle>
						</Inform>
					</Col>
					<Col xs={4}>
						<Inform>
							<Parent>
								{t('views')}
								:
							</Parent>
							<ItemTitle style={{fontSize:'16px'}}>
								{numberFormat(visitors)}
							</ItemTitle>
						</Inform>
					</Col>
					<Col xs={4}>
						<Inform>
							<Link href="#">
								{t('complain')}
							</Link>
						</Inform>
					</Col>
				</Information>
				{_.size(recommendation) > 0 && recommend(recommendation)}
				{_.size(recommendationByAuthor) > 0 && recommend(recommendationByAuthor, true)}
				<DetailComments productId={id} />
			</Container>
		</Wrapper>
	);
}

export default Detail;

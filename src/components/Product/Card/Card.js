import React from 'react';
import styled from 'styled-components';
import Star from 'media/icons/star/Star';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import sprintf from 'sprintf';
import {PRODUCT_DETAIL_URL} from 'location/routes';
import _ from 'lodash';
import numberFormat from 'tools/numberFormat';
import {Skeleton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import Heart from 'media/icons/Heart';
import {Alert} from 'react-bootstrap';
import img from './img.png';

const Wrapper = styled('div')`
  max-width: ${({theme}) => theme.card.width};
  min-width: ${({theme}) => theme.card.width};
  height: ${({theme, height}) => height || theme.card.height};
  border-radius: ${({theme}) => theme.border.radius.primary};
  display: flex;
  align-items: center;
  flex-direction: column;
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

const Img = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 224px;
  min-height: 224px;
  width: 100%;
  padding: ${({theme}) => theme.card.padding};
  position: relative;
  overflow: hidden;
  border-top-left-radius: ${({theme}) => theme.border.radius.primary};
  border-top-right-radius: ${({theme}) => theme.border.radius.primary};

  & img {
    transition: 0.5s all ease;
    display: block;
    height: 100%;
  }

  & .content {
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: #00000056;
    transition: 0.5s all ease;
    opacity: 0;
  }

  &:hover .content {
    opacity: 1;
    transition: 0.5s all ease;
    z-index: 10;
  }

  &:hover img {
    transition: 0.5s all ease;
    transform: scale(1.1);
  }
`;

const About = styled('div')`
  width: 100%;
  margin: 10px 0 0 0;
  padding: 10px 15px;
`;

const Price = styled('div')`
  font-style: ${({theme}) => theme.card.price.font.style};
  font-weight: ${({theme}) => theme.card.price.font.weight};
  font-size: ${({theme}) => theme.card.price.font.size};
  line-height: ${({theme}) => theme.card.price.font.height};
  display: flex;
  align-items: center;
  letter-spacing: ${({theme}) => theme.card.price.font.spacing};
  color: ${({theme}) => theme.card.price.font.color};
  mix-blend-mode: normal;

  & > span {
    margin-left: 3px;
  }
`;

const Description = styled('p')`
  font-weight: ${({theme}) => theme.card.description.font.weight};
  font-size: ${({theme}) => theme.card.description.font.size};
  line-height: ${({theme}) => theme.card.description.font.height};
  letter-spacing: ${({theme}) => theme.card.description.font.spacing};
  color: ${({theme}) => theme.card.description.font.color};
  mix-blend-mode: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  text-overflow: ellipsis;
`;

const Stars = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;

  & > :not(:last-child) {
    margin-right: 5px;
  }
`;

const Buttons = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartButton = styled(Button)`
  text-transform: initial !important;
  font-family: var(--base-font-family) !important;
  height: 47px;
  border-radius: 5px;
  width: 100% !important;
  margin-top: 55px;
  font-size: 16px !important;
  background: #4F71DC !important;
  color: #FFFFFF !important;
  box-sizing: border-box;
`;

const DeleteButton = styled(Alert)`
  margin-bottom: 0 !important;
  margin-top: 55px;
  height: 47px;
  box-shadow: 0 0 0 0 rgb(58 58 68 / 24%), 0 1px 2px rgb(90 91 106 / 24%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Circle = styled('div')`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0;
  z-index: 100;

  &.is-favourite {
    opacity: 1;
    box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};
    z-index: 100;
    & svg path {
      fill: ${({theme}) => theme.background.light.action};
      stroke: ${({theme}) => theme.background.light.action};
    }

    & svg > :last-child {
      fill: #ffffff;
      stroke: #ffffff;
    }

  }

  transition: 0.2s all ease;

  &:hover {
    box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};

    & svg path {
      fill: ${({theme}) => theme.background.light.action};
      stroke: ${({theme}) => theme.background.light.action};
    }

    & svg > :last-child {
      fill: #ffffff;
      stroke: #ffffff;
    }

    transition: 0.2s all ease;
  }
`;

const PriceRow = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > :not(:last-child) {
    margin-right: 10px;
  }

  align-items: end;
`;

function Card(props) {
	// Props data
	const {
		loading,
		handleRemoveFavourite,
		handleAddToFavourites,
		handleAdd,
		product,
		handleDelete,
		isSelected,
	} = props;
	// Data
	const description = _.get(product, ['product', 'description']);
	const favourite = _.get(product, ['favourite']);
	const id = _.get(product, ['id']);
	const sellPrice = _.get(product, ['pricing', 'sellPrice']);
	const discountPrice = _.get(product, ['pricing', 'discountPrice']);
	const currencySymbol = _.get(product, ['currency', 'symbol']);
	const image = _.get(product, ['images', '0', 'src']);
	const parent = _.get(product, ['parent', 'label']);
	const author = _.get(product, ['author', 'id'])
	// Hooks
	const history = useHistory();
	const {t} = useTranslation();
	// Render
	if (!loading) {
		return (
			<Wrapper>
				{favourite && (
					<Circle className="is-favourite" onClick={() => handleRemoveFavourite(product)}>
						<Heart/>
					</Circle>
				)}
				{!favourite && (
					<Circle onClick={() => handleAddToFavourites(product)}>
						<Heart/>
					</Circle>
				)}
				<Img onClick={() => history.push(sprintf(PRODUCT_DETAIL_URL, parent, Number(author), Number(id)))}>
					<div className="content"/>
					<img src={image || img} alt="no-image"/>
				</Img>
				<About>
					<div style={{minHeight:'132px'}} onClick={() => history.push(sprintf(PRODUCT_DETAIL_URL, id))}>
						{
							discountPrice && Number(discountPrice) !== 0
								? (
									<PriceRow>
										<Price>
											{numberFormat(Number(sellPrice) - Number(discountPrice))}
											<span>{currencySymbol}</span>
										</Price>
									</PriceRow>
								)
								: (
									<PriceRow>
										<Price>
											{numberFormat(sellPrice)}
											{' '}
											<span>{currencySymbol}</span>
										</Price>
									</PriceRow>
								)
						}
						<Description>
							{description}
						</Description>
						<Stars>
							<Star fontSize="20px"/>
							<Star fontSize="20px"/>
							<Star fontSize="20px"/>
							<Star fontSize="20px"/>
							<Star fontSize="20px"/>
						</Stars>
					</div>
					{
						!isSelected
							? (
								<Buttons>
									<CartButton onClick={() => handleAdd(product)}>
										{t('add_to_cart')}
									</CartButton>
								</Buttons>
							)
							: (
								<Buttons>
									<DeleteButton variant="success" onClick={() => handleDelete(id)}>
										{/*<CheckSquare size={17} style={{marginTop:'2px', marginRight:'5px'}}/>*/}
										{t('already_added')}
									</DeleteButton>
								</Buttons>
							)
					}
				</About>
			</Wrapper>
		);
	}
	return (
		<Wrapper height="auto" loading={loading ? 1 : 0}>
			<Img>
				<Skeleton variant="rectangular" height={190} style={{borderRadius:'10px'}}/>
			</Img>
			<About>
				<Description style={{marginTop:'-5px'}}>
					<Skeleton height={30} variant="text" style={{marginBottom:'5px'}}/>
					<Skeleton height={30} variant="text" style={{marginBottom:'5px'}}/>
					<Skeleton height={30} variant="text" width="65%"/>
				</Description>
				<Buttons>
					<Skeleton variant="rectangular" height="47px" style={{borderRadius:'5px'}}/>
				</Buttons>
			</About>
		</Wrapper>
	);
}

export default Card;

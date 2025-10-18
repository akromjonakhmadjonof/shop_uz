import React from 'react';
import styled from 'styled-components';
import {compose, withHandlers} from 'recompose';
import {useCart} from 'hooks/useCart';
import {openSnackbarAction} from 'actions/snackbar';
import {t} from 'i18next';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button} from '@material-ui/core';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import * as PATH from '../../location/routes';
import sprintf from 'sprintf';
import {Field} from 'redux-form';
import TextField from '../Fields/TextField';

const Wrapper = styled('div')`
  padding: 15px 0;
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
`;

const Image = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;

  & > div {
    width: 150px;
    height: 150px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Name = styled('p')`
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: text;
  margin-bottom: 0;
  color: black;
  text-transform: capitalize;
  margin-top: 10px;
  overflow: hidden;
  -webkit-line-clamp: 1;
  font-size: 17px;
  text-overflow: ellipsis;
`;

const Description = styled('p')`
  font-weight: ${({theme}) => theme.card.description.font.weight};
  font-size: ${({theme}) => theme.card.description.font.size};
  line-height: ${({theme}) => theme.card.description.font.height};
  letter-spacing: ${({theme}) => theme.card.description.font.spacing};
  color: ${({theme}) => theme.card.description.font.color};
  mix-blend-mode: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  text-overflow: ellipsis;
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
  cursor: pointer;
  width: 49% !important;
  margin-top: 15px;
  font-size: 16px !important;
  background: #4F71DC !important;
  color: #FFFFFF !important;
  box-sizing: border-box;
`;

const DeleteButton = styled(Alert)`
  margin-bottom: 0 !important;
  margin-top: 15px;
  height: 47px;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgb(58 58 68 / 24%), 0 1px 2px rgb(90 91 106 / 24%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49% !important;
`;

const enhance = compose(
	connect(),
	withHandlers({
		handleDeleteProduct:(props) => (productId) => {
			const {dispatch} = props;
			const {handleDelete} = useCart(dispatch);
			handleDelete(productId);
			dispatch(openSnackbarAction({
				message:`${t('successful_removed')}!`,
			}));
		}
	})
);

const BasketItem = (props) => {
	const {data, isBasket} = props;

	const {t} = useTranslation();

	const id = _.toInteger(_.get(data, ['id']));
	const image = _.get(data, ['images', '0', 'src']);
	const productName = _.get(data, ['product', 'name']);
	const description = _.get(data, ['product', 'description']);

	const parent = _.toInteger(_.get(data, ['parent', 'label']));
	const author = _.toInteger(_.get(data, ['author', 'id']));
	const history = useHistory();

	const handleRedirect = () => {
		history.push({
			pathname:sprintf(PATH.PRODUCT_DETAIL_URL, parent, author, id)
		});
	};

	return (
		<Wrapper key={id}>
			<Image>
				<div>
					<img src={image} alt={''}/>
				</div>

			</Image>
			<Name>
				{productName}
			</Name>
			<Description>
				{description}
			</Description>
			<Buttons>
				<CartButton onClick={handleRedirect}>
					{t('view_details')}
				</CartButton>
				<DeleteButton variant="danger" onClick={() => props.handleDeleteProduct(id)}>
					{t('remove')}
				</DeleteButton>
			</Buttons>
			{isBasket && <Field
				component={TextField}
				name={'comment_ ' + id}
				fullWidth
				textarea
				style={{marginTop: '25px'}}
				placeholder={'enter_comment'}
				label={'comment'}
			/>}
		</Wrapper>
	);
};


export default enhance(BasketItem);

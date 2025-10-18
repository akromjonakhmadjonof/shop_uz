import React from 'react';
import _ from 'lodash';
import BasketItem from 'components/BasketItem';
import Empty from 'components/Empty';
import styled from 'styled-components';
import Container from 'components/Container';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';
import Description from '../../Description';
import numberFormat from '../../../tools/numberFormat';
import {Button} from 'react-bootstrap';

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const List = styled('div')`
  width: 50%;
`;

const Content = styled('div')`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Bar = styled('div')`
  width: 90%;
  border: 1px solid ${({theme}) => theme.border.color.primary};
  border-radius: 14px;
  padding: 15px 20px;
  background: #F9F9F9;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
  height: 45px;
`;

const description = {
	child: {
		fontSize: '16px'
	},
	parent: {
		fontSize: '16px'
	}
}

const Basket = (props) => {
	const {products, sum, rub, usd, length} = props;
	const {t} = useTranslation();
	return (
		<Container>
			<Title>
				{t('basket')}
			</Title>
			<Wrapper>
				{!_.isEmpty(products) &&
					(
						<List>
							{
								_.map(products, (item) => {
									return (
										<BasketItem isBasket data={item}/>
									);
								})
							}
						</List>
					)
				}
				{
					_.isEmpty(products) && <Empty/>
				}
				{
					!_.isEmpty(products) &&
					<Content>
						<Bar>
							<Title styles={{fontSize: '18px'}}>
								Счeт
							</Title>
							<Description childStyles={description.child} parentStyles={description.parent} parent={'So\'m (uzs) :'} child={numberFormat(sum, 'uzs')} />
							<Description childStyles={description.child} parentStyles={description.parent} parent={'Dollar ($) :'} child={numberFormat(usd, '$')} />
							<Description childStyles={description.child} parentStyles={description.parent} parent={'Рубль (руб) :'} child={numberFormat(rub, 'руб')} />
							<Description childStyles={description.child} parentStyles={description.parent} parent={t('amount_products') + ' :'} child={numberFormat(length, t('unit_symbol'))} />
							<StyledButton variant="success">
								{t('send_offer')}
							</StyledButton>
						</Bar>
					</Content>
				}
			</Wrapper>
		</Container>
	);
}

export default Basket;

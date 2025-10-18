import React from 'react';
import {Col, Row} from 'react-bootstrap';
import _ from 'lodash';
import Container from 'components/Container';
import Pagination from 'components/Fields/Pagination';
import styled from 'styled-components';
import Carousel from 'components/Carousel';
import {useTranslation} from 'react-i18next';
import CardWrapper from 'components/Product/Card/CardWrapper';
import Loader from 'components/Loader';
import {LoaderWrapper} from 'components/Loader/Loader';

// Styles

const Wrapper = styled('div')`
  width: 100%;
  padding-top: 20px;
`;

const Title = styled('p')`
  font-style: normal;
  margin-top: 50px;
  font-weight: 600;
  font-family: var(--base-font-family);
  font-size: 34px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${({theme}) => theme.color.dark.dark_grey};
  margin-bottom: 0;
`;

const PaginationGroup = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

// Component

export default function Home(props) {
	const {products, loading, count, cart} = props;

	// Hooks
	const {t} = useTranslation();
	// Render

	if (!loading) {
		return (
			<Wrapper>
				<Container>
					<Carousel/>
					<Title>
						{t('pop_products')}
					</Title>
					<Row>
						{
							_.map(products, (item, key) => (
								<Col className={'card-home'} key={key} lg={3} md={4} sm={6} xs={12}>
									<CardWrapper cart={cart} loading={loading ? 1 : 0} product={item}/>
								</Col>
							))
						}
						<Col xs={12}>
							<PaginationGroup>
								<Pagination total={count}/>
							</PaginationGroup>
						</Col>
					</Row>
				</Container>
			</Wrapper>
		);
	}
	return (
		<LoaderWrapper>
			<Loader/>
		</LoaderWrapper>
	);
}

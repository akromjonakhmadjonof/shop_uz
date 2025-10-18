import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import {Col, Row} from 'react-bootstrap';
import _ from 'lodash';
import CardWrapper from 'components/Product/Card/CardWrapper';
import Pagination from 'components/Fields/Pagination';
import AddCard from 'components/Card/AddCard';
import {useHistory} from 'react-router-dom';
import {ADS_URL} from 'location/routes';

// Styles
const Wrapper = styled('div')`
  width: 100%;
  padding-top: 20px;
	padding-bottom: 40px;
`;

const PaginationGroup = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

// Component
function Orders(props) {
	// Props data
	const {products} = props;
	// Hooks
	const history = useHistory();
	// Render
	return (
		<Wrapper>
			<Container>
				<Row>
					<Col className="card-home" lg={3} md={4} sm={6} xs={12}>
						<AddCard
							label="add_ad"
							handleAdd={() => history.push(ADS_URL)}
						/>
					</Col>
					{
						_.map(products, (item, key) => (
							<Col className="card-home" key={key} lg={3} md={4} sm={6} xs={12}>
								<CardWrapper
									isOrder={true.toString()}
									product={item}
								/>
							</Col>
						))
					}
					<Col xs={12}>
						<PaginationGroup>
							<Pagination total={1}/>
						</PaginationGroup>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
}

export default Orders;

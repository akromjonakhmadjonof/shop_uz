import React from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import {Col, Row} from 'react-bootstrap';
import CardWrapper from 'components/Product/Card/CardWrapper';
import Pagination from 'components/Fields/Pagination';
import Empty from 'components/Empty';

// Styles
const Wrapper = styled('div')`
  padding: 40px 0;
  width: 100%;
`;
const PaginationGroup = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

// Component
function Favourites(props) {
	const {list} = props;

	// Render
	return (
		<Wrapper>
			<Container>
				{!_.isEmpty(list) && (
					<Row>
						{
							_.map(list, (item, key) => (
								<Col
									className="card-home"
									key={key}
									lg={3}
									md={4}
									sm={6}
									xs={12}
								>
									<CardWrapper product={item}/>
								</Col>
							))
						}
						{/*<Col xs={12}>*/}
						{/*	<PaginationGroup>*/}
						{/*		<Pagination total={_.size(list)}/>*/}
						{/*	</PaginationGroup>*/}
						{/*</Col>*/}
					</Row>
				)}
				{_.isEmpty(list) && <Empty/>}
			</Container>
		</Wrapper>
	);
}

export default Favourites;

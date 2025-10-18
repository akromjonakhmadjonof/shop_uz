import React from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import LeftSide from './LeftSide';
import {Col, Row} from 'react-bootstrap';
import RightSide from './RightSide';
import _ from 'lodash';
import CardWrapper from 'components/Product/Card/CardWrapper';
import Pagination from 'components/Fields/Pagination';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';

// Styles
const Wrapper = styled('div')`
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
const User = (props) => {
	// Props data
	const {
		handleChangeTab,
		activeTab,
		data,
		createChat,
		createFollow,
		authId,
		followers,
		followings,
		deleteFollow,
		followCreateLoading,
		isFollowed,
		userProducts
	} = props;
	const document = _.get(data, ['document']);
	const count = _.size(userProducts);
	const {t} = useTranslation()

	// Render
	return (
		<Container>
			<Wrapper>
				<Row>
					<Col xs={12} lg={4} md={4} sm={5}>
						<LeftSide
							createFollow={createFollow}
							isFollowed={isFollowed}
							createChat={createChat}
							followCreateLoading={followCreateLoading}
							deleteFollow={deleteFollow}
							authId={authId}
							data={document}
						/>
					</Col>
					<Col xs={12} lg={8} md={8} sm={7}>
						<RightSide
							followings={followings}
							followers={followers}
							data={document}
							handleChangeTab={handleChangeTab}
							activeTab={activeTab}
						/>
					</Col>
				</Row>
				<Title styles={{marginTop: '30px'}}>
					{t('author_other_posts')}
				</Title>
				<Row>
					{
						_.map(userProducts, (item, key) => (
							<Col key={key} lg={3} md={4} sm={6} xs={12}>
								<CardWrapper product={item}/>
							</Col>
						))
					}
					<Col xs={12}>
						<PaginationGroup>
							<Pagination total={count}/>
						</PaginationGroup>
					</Col>
				</Row>
			</Wrapper>
		</Container>
	);
};

export default User;

import React from 'react';
import {Col, Row} from 'react-bootstrap';
import OptionsWrapper from 'components/Options';
import Container from 'components/Container';
import _ from 'lodash';
import CardWrapper from 'components/Product/Card';
import styled from 'styled-components';
import Pagination from 'components/Fields/Pagination';
import Empty from 'components/Empty';
import TagSearch from 'components/Fields/TagSearch';
import {Field} from 'redux-form';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';

const CustomRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Products = styled('div')`
  width: 100%;
  margin-right: -20px;
  display: flex;
  justify-content: center;

  & > .row {
    width: 100%;
    margin-top: -40px !important;

    & > div {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
`;

const PaginationGroup = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Tags = styled('div')`
    margin-bottom: 25px;
    margin-top: -20px;
  //& > * {
  //
  //  & > :not(:first-child) > div {
  //    margin-left: 15px;
  //  }
  //}
`;

const EmptyWrapper = styled('div')`
  margin-top: 50px;
`;

function Category(props) {
	const {list, loading, page} = props;
	return (
		<Container>
			<Tags>
				<Field
					component={TagSearch}
					name="tags"
				/>
				{/* <Col xs={12} lg={6} md={6} sm={12}> */}
				{/*    <Field */}
				{/*        component={TextField} */}
				{/*        name={'productCode'} */}
				{/*        label={t('search_by_code')} */}
				{/*        placeholder={t('search_by_code') + ' . . .'} */}
				{/*    /> */}
				{/* </Col> */}
			</Tags>
			<CustomRow className="category-search-section">
				<Col className="filters" md={3} lg={3}>
					<OptionsWrapper/>
				</Col>
				<Col md={9} sm={12} xs={12} lg={9}>
					{
						loading
							? (
								<LoaderWrapper>
									<Loader/>
								</LoaderWrapper>
							) : null
					}
					{
						!loading
						&& (
							<Products>
								{!_.isEmpty(list)
									&& (
										<Row>
											{
												_.map(list, (item, key) => (
													<Col key={key} lg={4} md={6} sm={6}>
														<CardWrapper loading={loading ? 1 : 0} product={item}/>
													</Col>
												))
											}
										</Row>
									)}
								{
									_.isEmpty(list)
									&& (
										<EmptyWrapper>
											<Empty/>
										</EmptyWrapper>
									)
								}
							</Products>
						)
					}
				</Col>
				<Col xs={12}>
					<PaginationGroup>
						<Pagination total={+page * 10}/>
					</PaginationGroup>
				</Col>
			</CustomRow>
		</Container>
	);
}

export default Category;

/*

                <Fields
                    component={RegionField}
                    names={['country', 'city', 'state']}
                    countryData={countries}
                    cityData={cities}
                    stateData={states}
                />

* */

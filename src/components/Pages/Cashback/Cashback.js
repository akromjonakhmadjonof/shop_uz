import React from 'react';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import {Table, Tag} from 'antd';
import numberFormat from 'tools/numberFormat';
import styled from 'styled-components';
import {Title} from 'components/Title';
import {useHistory} from 'react-router-dom';
import sprintf from 'sprintf';
import {PRODUCT_DETAIL_URL} from 'location/routes';
import _ from 'lodash';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';

// Styles
const Price = styled('p')`
  text-decoration: line-through #F61B58 2px;
`;

const Wrapper = styled('div')`
  width: 100%;
  overflow: auto;
  .ant-table table {
    min-width: 1070px !important;
  }
  .ant-pagination-options {
    display: none;
  }

  .ant-pagination-item {
    background: #F2F2F2;
    border: none;
  }

  .ant-pagination-item-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border: none;
    background-color: #4F71DC;

    & svg path {
      fill: #fff;
    }

    &:disabled {
      opacity: 0.5;
      background-color: #F2F2F2;

      & svg path {
        fill: #333333 !important;
      }
    }
  }

  .ant-pagination-item-active {
    background-color: #4F71DC;
    color: white;
  }

  .ant-pagination-item {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }

  .ant-pagination-jump-next, .ant-pagination-jump-prev {
    border-radius: 2px !important;

    & svg path {
      fill: #fff;
    }

    .ant-pagination-item-ellipsis {
      color: #fff;
      margin-left: -4px;
    }

    .anticon-double-right svg {
      margin-top: -5px;
    }
  }

  .ant-table-cell {
    max-height: 77px;
    min-height: 77px;
  }
`;

// Component
function Cashback(props) {
	const {cashbacks, loading} = props;
	// Hooks
	const {t} = useTranslation();
	const history = useHistory();
	// Data
	const columns = [
		{
			title:'№',
			dataIndex:'id',
			width:'5%',
		},
		{
			title:t('product'),
			dataIndex:'product',
			width:'21%',
		},
		{
			title:t('type'),
			dataIndex:'type',
			width:'12%',
		},
		{
			title:t('price'),
			dataIndex:'price',
			width:'12%',
		},
		{
			title:t('discount_price'),
			dataIndex:'discount_price',
			width:'12%',
		},
		{
			title:t('discount_percentage'),
			dataIndex:'discount_percentage',
			width:'12%',
		},
	];
	const products = _.map(cashbacks, (item, key) => {
		const name = _.get(item, ['product', 'name']);
		const price = _.get(item, ['pricing', 'sellPrice']);
		const discountPrice = _.get(item, ['pricing', 'discountPrice']);
		const discountPercent = parseFloat(_.get(item, ['pricing', 'discountPercent'])).toFixed(1);
		const currency = _.get(item, ['currency', 'symbol']);
		const productCode = _.get(item, ['id']);
		return {
			id:key + 1,
			product_code:productCode,
			product:name,
			price:<Price>{numberFormat(price, currency)}</Price>,
			type:<Tag>bakery</Tag>,
			discount_price:numberFormat(price - discountPrice, currency),
			discount_percentage:numberFormat(discountPercent, '%'),
		};
	});

	// Handler
	function onChange(pagination, filters, sorter, extra) {

	}

	// Render
	return (
		<Container>
			<Title style={{marginBottom:'20px'}}>
				{t('discounts')}
			</Title>
			<Wrapper>
				{!loading && (
					<Table
						onRow={(item) => {
							const id = _.get(item, ['product_code']);
							return {
								onClick:() => {
									history.push({
										pathname:sprintf(PRODUCT_DETAIL_URL, id),
									});
								},
							};
						}}
						pagination={false}
						columns={columns}
						dataSource={products}
						onChange={onChange}
					/>
				)}
				{
					loading && <LoaderWrapper><Loader/></LoaderWrapper>
				}
			</Wrapper>
		</Container>
	);
}

export default Cashback;

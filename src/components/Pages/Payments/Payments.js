import React from 'react';
import styled from 'styled-components';
import {Table, Tag} from 'antd';
import {useTranslation} from 'react-i18next';

const Wrapper = styled('div')`
  width: 100%;
  padding: 20px 0;
`;

function Payments() {
	const {t} = useTranslation();
	const columns = [
		{
			title:'№',
			dataIndex:'id',
			width:'5%',
		},
		{
			title:t('from'),
			dataIndex:'from',
			width:'15%',
		},
		{
			title:t('to_whom'),
			dataIndex:'to_whom',
			width:'15%',
		},
		{
			title:t('type'),
			dataIndex:'type',
			width:'15%',
		},
		{
			title:t('sum'),
			dataIndex:'sum',
			width:'15%',
		},
		{
			title:t('nds'),
			dataIndex:'nds',
			width:'15%',
		},
	];
	const data = [
		{
			id:1,
			from:'John Brown',
			to_whom:'Jim Green',
			type:<Tag>payme</Tag>,
			sum:'12000$',
			nds:'1%',
		},
		{
			id:2,
			from:'Joe Black',
			to_whom:'Jim Red',
			type:<Tag>humo</Tag>,
			sum:'1200sum',
			nds:'1%',
		},
		{
			id:3,
			from:'Azizjon',
			to_whom:'Akromjon',
			type:<Tag>click</Tag>,
			sum:'1200sum',
			nds:'1%',
		},
		{
			id:4,
			from:'John doe',
			to_whom:'Andre',
			type:<Tag>cash</Tag>,
			sum:'1200sum',
			nds:'1%',
		},
	];

	function onChange(pagination, filters, sorter, extra) {

	}

	return (
		<Wrapper>
			<Table columns={columns} dataSource={data} onChange={onChange}/>
		</Wrapper>
	);
}

export default Payments;

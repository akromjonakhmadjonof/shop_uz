import React from 'react';
import {ConfigProvider, Table} from 'antd';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import dateTimeFormat from 'tools/dateTimeFormat';
import {useHistory} from 'react-router-dom';
import Empty from 'components/Empty';

// Component
const Subscribers = (props) => {
	const {data} = props;
	const followData = _.get(data, ['data']);
	// Hooks
	const {t} = useTranslation();
	const history = useHistory();

	// Render
	const header = [
		{
			'title':t('full_name'),
			'dataIndex':'fullName',
			'width':'40%',
		},
		{
			'title':t('user_name'),
			'dataIndex':'userName',
			'width':'30%',
		},
		{
			'title':t('followed_date'),
			'dataIndex':'followedDate',
			'width':'30%',
		},
	];

	const dataSource = _.map(followData, (item) => {
		const fullName = _.get(item, ['fullName']);
		const userName = _.get(item, ['userName']);
		const followedDate = dateTimeFormat(_.get(item, ['followedDate']));
		return {
			...item,
			'fullName':fullName,
			'userName':userName,
			'followedDate':followedDate,
		};
	});
	return (
		<>
			<ConfigProvider renderEmpty={() => <Empty />}>

				<Table
					pagination={false}
					columns={header}
					dataSource={dataSource}
					// onRow={(item) => {
					// 	const id = _.get(item, ['userId']);
					// 	return {
					// 		onClick:() => {
					// 			history.push({
					// 				pathname:sprintf(PATH.USER_DETAILS_URL, id),
					// 			});
					// 		},
					// 	};
					// }}
				>
				</Table>
			</ConfigProvider>
		</>
	);
};

export default Subscribers;

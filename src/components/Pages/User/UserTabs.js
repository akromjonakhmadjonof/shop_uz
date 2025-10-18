import React from 'react';
import styled from 'styled-components';
import {Tabs} from 'antd';
import {Clock, Send, UserCheck} from 'react-feather';
import {useTranslation} from 'react-i18next';
import Subscribers from './Subscribers';
import UserDetails from './UserDetails';

// Styles
const Label = styled('div')`
  display: flex;
  padding: 0 5px;
  color: ${({isActive}) => isActive ? '#3B68CD' : '#262626'};
  & > svg {
	stroke: ${({isActive}) => isActive ? '#3B68CD' : '#262626'};
    margin-right: 10px;
  }

  align-items: center;
`;

// Component
const UserTabs = (props) => {
	// Tab Pane
	const {TabPane} = Tabs;
	// Props data
	const {
		tabValue, handleChangeTab, data, followers, followings
	} = props;
	// Hooks
	const {t} = useTranslation();
	const currentTab = tabValue || 'history'
	// Render
	return (
		<>
			<Tabs defaultActiveKey={currentTab} onChange={handleChangeTab}>
				<TabPane
					tab={(
						<Label isActive={currentTab === 'history'}>
							<Clock size={18}/>
							{t('details')}
						</Label>
					)}
					key="history"
				>
					<UserDetails data={data}/>
				</TabPane>
				<TabPane
					tab={(
						<Label isActive={currentTab === 'followers'}>
							<UserCheck size={18}/>
							{t('followers')}
						</Label>
					)}
					key="followers"
				>
					<Subscribers data={followers}/>
				</TabPane>
				<TabPane
					tab={(
						<Label isActive={currentTab === 'following'}>
							<Send size={18}/>
							{t('following')}
						</Label>
					)}
					key="following"
				>
					<Subscribers data={followings}/>
				</TabPane>

			</Tabs>
		</>
	);
};

export default UserTabs;

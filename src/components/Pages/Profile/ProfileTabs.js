import {Tabs} from 'antd';
import {CreditCard, Heart, MessageCircle, PlusSquare, Settings as SettingsIcon,} from 'react-feather';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import SettingsWrapper from 'components/Pages/Settings/SettingsWrapper';
import PaymentsWrapper from 'components/Pages/Payments';
import OrdersWrapper from 'components/Pages/Orders';
import CommentsWrapper from 'components/Pages/Comments/CommentsWrapper';
import FavouritesWrapper from 'components/Pages/Favourites';

// Styles
const Label = styled('div')`
  display: flex;

  & > svg {
    margin-right: 6px;
  }

  align-items: center;
`;

// Component
function ProfileTabs(props) {
	// Props data
	const {
		tabValue, handleChangeTab
	} = props;
	// Hooks
	const {t} = useTranslation();
	// Data
	const {TabPane} = Tabs;
	// Render
	return (
		<Tabs defaultActiveKey={tabValue || 'ads'} onChange={handleChangeTab}>
			<TabPane
				tab={(
					<Label>
						<PlusSquare size={20}/>
						{t('ads')}
					</Label>
				)}
				key="ads"
			>
				<OrdersWrapper/>
			</TabPane>
			<TabPane
				tab={(
					<Label>
						<Heart size={20}/>
						{t('navbar_favourites')}
					</Label>
				)}
				key="favourites"
			>
				<FavouritesWrapper/>
			</TabPane>
			<TabPane
				tab={(
					<Label>
						<CreditCard size={20}/>
						{t('payments')}
					</Label>
				)}
				key="payments"
			>
				<PaymentsWrapper/>
			</TabPane>
			<TabPane
				tab={(
					<Label>
						<MessageCircle size={20}/>
						{t('comments')}
					</Label>
				)}
				key="comments"
			>
				<CommentsWrapper/>
			</TabPane>
			<TabPane
				tab={(
					<Label>
						<SettingsIcon size={20}/>
						{t('settings')}
					</Label>
				)}
				key="settings"
			>
				<SettingsWrapper/>
			</TabPane>
		</Tabs>
	);
}

export default ProfileTabs;

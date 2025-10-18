import React from 'react';
import styled from 'styled-components';
import UserTabs from './UserTabs';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';

// Styles
const Wrapper = styled('div')`
  padding-left: 40px;
  & .ant-tabs-ink-bar {
    background: #3B68CD;
  }
`;

// Component
const RightSide = (props) => {
	// Props data
	const {activeTab, handleChangeTab, data, followers, followings} = props;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Title style={{marginBottom:'20px'}}>
				{activeTab === 'followers' ? t('followers') : activeTab === 'following' ? t('following') : t('about_me')}
			</Title>
			<UserTabs
				followings={followings}
				followers={followers}
				data={data}
				tabValue={activeTab}
				handleChangeTab={handleChangeTab}
			/>
		</Wrapper>
	);
};

export default RightSide;

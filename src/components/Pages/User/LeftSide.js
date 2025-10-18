import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {MessageSquare, UserMinus, UserPlus} from 'react-feather';
import _ from 'lodash';
import Description from 'components/Description';
import userNameFormat from 'tools/userNameFormat';
import * as PATH from 'constants/api';
import sprintf from 'sprintf';
// Styles
const Wrapper = styled('div')`
  width: 100%;

  & svg.rotate {
    margin-left: 6px;
    transform: rotate(40deg);
  }
`;

const Image = styled('div')`
  width: 170px;
  height: 170px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const List = styled('ul')`
  width: 100%;
  margin-top: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-top: 1px solid ${({theme}) => theme.border.color.primary};
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
`;

const Item = styled('li')`
  width: 100%;
  display: flex;

  & > a {
    color: #3B68CD !important;
  }

  align-items: flex-start;
  justify-content: space-between;
  font-size: 14.5px;
`;

const Title = styled('h5')`
  font-weight: 600;
  margin-top: 20px;
`;


// Component
const LeftSide = (props) => {
	const {data, createChat, createFollow, authId, deleteFollow, followCreateLoading} = props;

	// Data
	const fullName = _.get(data, ['fullName']);
	const email = _.get(data, ['emails', '0']);
	const phoneNumber = _.get(data, ['phones', '0']);
	const face = _.get(data, ['face']);
	const userName = _.get(data, ['userName']);
	const image = _.get(data, ['image', 'src']);
	const socialAccounts = _.get(data, ['socialAccounts']);
	const telegram = _.get(socialAccounts, ['telegram']);
	const instagram = _.get(socialAccounts, ['instagram']);
	const facebook = _.get(socialAccounts, ['facebook']);
	const twitter = _.get(socialAccounts, ['twitter']);
	const userId = _.get(data, ['userId']);
	const isFollowed = _.get(data, ['isFollowed']) || props.isFollowed;
	const getSocialLink = (key) => {
		switch (key) {
		case 'telegram':
			return sprintf(PATH.TELEGRAM_USER_URL, telegram);
		case 'instagram':
			return sprintf(PATH.INSTAGRAM_USER_URL, instagram);
		case 'facebook':
			return sprintf(PATH.FACEBOOK_USER_URL, facebook);
		case 'twitter':
			return sprintf(PATH.TWITTER_USER_URL, twitter);
		}
	};
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Image>
				<img src={image} alt={userName}/>
			</Image>
			<Title>
				{t('information')}
			</Title>
			<List>
				<Description standard parent={t('user_name') + ':'} child={userName}/>
				<Description standard parent={t('full_name') + ':'} child={fullName}/>
				<Description standard parent={t('face') + ':'}
							 child={face === 'individual' ? t('individual') : face === 'legal' ? t('legal') : t('not_indicated')}/>
				<Description standard parent={t('mobile_phone') + ':'} child={phoneNumber}/>
				<Description standard parent={t('email') + ':'} child={email}/>
			</List>
			<Title>
				{t('contacts')}
			</Title>
			<List>
				<Item>
					<p>{t('telegram')}:</p>
					<a href={getSocialLink('telegram')} target={'_blank'}>
						{userNameFormat(telegram, t('not_indicated'))}
					</a>
				</Item>
				<Item>
					<p>{t('instagram')}:</p>
					<a href={getSocialLink('instagram')} target={'_blank'}>
						{t(userNameFormat(instagram, t('not_indicated')))}
					</a>
				</Item>
				<Item>
					<p>{t('facebook')}:</p>
					<a href={getSocialLink('facebook')} target={'_blank'}>
						{userNameFormat(facebook, t('not_indicated'))}
					</a>
				</Item>
				<Item>
					<p>{t('twitter')}:</p>
					<a href={getSocialLink('twitter')} target={'_blank'}>
						{userNameFormat(twitter, t('not_indicated'))}
					</a>
				</Item>
			</List>
			{(!isFollowed && userId !== authId) &&
				<Button
					variant={'success'}
					onClick={() => createFollow(userId)}
					followCreateLoading={followCreateLoading}
					label={t('follow')}
					rightIcon={<UserPlus size={16}/>}
				/>
			}
			{(isFollowed && userId !== authId) &&
				<Button
					followCreateLoading={followCreateLoading}
					variant={'danger'}
					onClick={() => deleteFollow(userId)}
					label={t('unfollow')}
					rightIcon={<UserMinus size={17}/>}
				/>
			}
			<Button
				variant={'primary'}
				onClick={() => createChat(userId)}
				label={t('start_messaging')}
				rightIcon={<MessageSquare size={17}/>}
			/>
		</Wrapper>
	);
};

export default LeftSide;

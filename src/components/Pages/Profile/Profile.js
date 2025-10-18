import React, {useState} from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Title} from 'components/Title';
import {AtSign, Camera, Image, Phone,} from 'react-feather';
import {useFileUpload} from 'use-file-upload';
import _ from 'lodash';
import Telegram from 'media/icons/telegram';
import Facebook from 'media/icons/facebook';
import ProfileTabs from './ProfileTabs';
import {useHistory} from 'react-router-dom';
import * as PATH from 'constants/api';
import sprintf from 'sprintf';

// Styles
const TabContent = styled('div')`
  width: 100%;
  margin-top: 20px;

  .ant-tabs-tab-btn {
    font-size: 17px;
  }

  .ant-tabs > .ant-tabs-nav, .ant-tabs > div > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

const ImgContent = styled('div')`
  height: 450px;
  margin-bottom: 95px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: center center / cover #80808049;
`;

const ProfileImage = styled('div')`
  width: 100px;

  & > input[type='file'] {
    display: none;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: white;
  left: 50px;
  border-radius: 50%;
  border: 2px solid #e1e1e1;
  bottom: -50px;
  height: 100px;
`;

const SelectImg = styled('label')`
  width: 100%;
  cursor: pointer;
  position: absolute;
  top: 0;
  //background-color: #00000091;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 100%;
  left: 0;
`;

const Img = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const Group = styled('div')`
  width: auto;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  position: absolute;

  & > :not(:last-child) {
    margin-right: 10px;
  }

  bottom: 0;
  right: 0;
`;

const TelegramWrapper = styled('a')`
  min-width: 40px;
  max-width: 40px;
  padding-right: 1px;
  padding-bottom: 3px;
  cursor: pointer;
  min-height: 40px;
  max-height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: .2s;

  &:hover {
    transition: .2s;
    background-color: #1e96c8;

    & svg {
      fill: white
    }
  }

  & svg {
    fill: #1e96c8
  }
`;

const FacebookWrapper = styled('a')`
  min-width: 40px;
  max-width: 40px;
  cursor: pointer;
  min-height: 40px;
  max-height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: .2s;

  &:hover {
    transition: .2s;
    background-color: #036de4;

    & svg {
      fill: white;
    }
  }

  & svg {
    fill: #036de4;
  }
`;

const PhoneWrapper = styled('a')`
  min-width: 40px;
  max-width: 40px;
  cursor: pointer;
  min-height: 40px;
  max-height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: .2s;

  &:hover {
    transition: .2s;
    background-color: #48C857;

    & svg {
      stroke: white;
    }
  }

  & svg {
    stroke: #48C857;
  }
`;

const MailWrapper = styled('a')`
  min-width: 40px;
  max-width: 40px;
  cursor: pointer;
  min-height: 40px;
  max-height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: .2s;

  &:hover {
    transition: .2s;
    background-color: #EF9A10;

    & svg {
      stroke: white;
    }
  }

  & svg {
    stroke: #EF9A10;
  }
`;

// Component
function Profile(props) {
	// Props data
	const {
		handleChangeTab, tabValue, chatId, setChat, user
	} = props;
	// Hooks
	const {t} = useTranslation();
	const [img, setImg] = useState('');
	const [file, setFile] = useFileUpload();
	const history = useHistory();

	// Data
	const image = _.get(user, ['image', 'src']);
	const socialAccounts = _.get(user, ['socialAccounts']);
	const telegram = _.get(socialAccounts, ['telegram']);
	const instagram = _.get(socialAccounts, ['instagram']);
	const facebook = _.get(socialAccounts, ['facebook']);
	const twitter = _.get(socialAccounts, ['twitter']);
	const email = _.get(user, ['emails', '0']);
	const phone = _.get(user, ['phones', '0']);
	// Handlers
	const handleChange = () => {
		setFile({accept:'image/*'}, (data) => {
			setImg(_.get(data, ['source']));
		});
	};

	const title = (key) => {
		switch (key) {
		case 'ads':
			return 'your_ads';
		case 'messages':
			return 'navbar_message';
		case 'payments':
			return 'payments';
		case 'balance_shop':
			return 'balance_shop';
		case 'comments':
			return 'comments';
		case 'settings':
			return 'settings';
		case 'favourites':
			return 'navbar_favourites';
		default:
			return 'ads';
		}
	};
	const getUrl = (key) => {
		switch (key) {
		case 'telegram':
			return sprintf(PATH.TELEGRAM_USER_URL, telegram);
		case 'instagram':
			return sprintf(PATH.INSTAGRAM_USER_URL, instagram);
		case 'facebook':
			return sprintf(PATH.FACEBOOK_USER_URL, facebook);
		case 'twitter':
			return sprintf(PATH.TWITTER_USER_URL, twitter);
		case 'mail':
			return `mailto:${email}`;
		case 'phone':
			return `tel:${phone}`;

		}
	};
	// Render
	return (
		<Container>
			<ImgContent>
				<Image stroke="#333" size={120}/>
				<ProfileImage>
					{!image && (
						<SelectImg onClick={handleChange}>
							<Camera size={30} stroke="#333"/>
						</SelectImg>
					)}
					<Img><img src={image} alt="profile"/></Img>
				</ProfileImage>
				<Group>
					{telegram && <TelegramWrapper href={getUrl('telegram')} target={'_blank'}>
						<Telegram/>
					</TelegramWrapper>}
					{facebook && <FacebookWrapper href={getUrl('facebook')} target={'_blank'}>
						<Facebook/>
					</FacebookWrapper>}
					{phone && <PhoneWrapper href={getUrl('phone')}>
						<Phone/>
					</PhoneWrapper>}
					{email && <MailWrapper href={getUrl('mail')}>
						<AtSign/>
					</MailWrapper>}
				</Group>
			</ImgContent>
			<Title>
				{t(title(tabValue || 'ads'))}
			</Title>
			<TabContent>
				<ProfileTabs
					handleChangeTab={handleChangeTab}
					tabValue={tabValue}
					chatId={chatId}
					setChat={setChat}
				/>
			</TabContent>
		</Container>
	);
}

export default Profile;

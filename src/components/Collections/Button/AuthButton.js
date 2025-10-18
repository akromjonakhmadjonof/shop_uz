import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import User from 'media/icons/user/user';
import {useTranslation} from 'react-i18next';
import {Popover, Tooltip} from 'antd';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router';
import _ from 'lodash';
import {LogIn, Settings as SettingsIcon, User as UserIcon,} from 'react-feather';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getToken} from 'tools/storage/storage';
import {LOGIN_URL, PROFILE_URL} from 'location/routes';
import {appendParamsToUrl} from 'tools/url';
import {signOutAction} from 'actions/auth';
import {TOKEN_VALID} from 'location';
import useLoading from 'tools/useLoading';

// Enhance
const enhance = compose(
	connect((state) => {
		const token = getToken();
		const user = _.get(state, ['auth', 'data']);
		const loading = _.get(state, ['auth', 'loading']);
		return {
			loading,
			token,
			user,
		};
	}),
);

// Style
const Button = styled('div')`
  width: auto;
  position: relative;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({theme}) => theme.color.dark.dark_grey};

  & > :first-child {
    margin-right: 7px;
  }
`;

const Length = styled('div')`
  width: 30px;
  height: 20px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.background.light.action};
  display: flex;
  align-items: center;
  top: -15px;
  justify-content: center;
  position: absolute;
  color: #fff;
  right: -25px;
`;

const Title = styled('div')`
  p {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0;
  }

  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Content = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
  }
`;

const Item = styled('div')`
  width: 100%;
  height: 50px;
  font-weight: 500;

  & p {
    margin-bottom: 0;
    font-size: 16px;
    margin-left: 10px;
  }

  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PopoverGlobalStyle = createGlobalStyle`
  .ant-popover-inner-content {
    padding: 0 16px !important;
  }

  .ant-popover-inner {
    border-radius: 7px;
  }
`;

// Component
function AuthButton(props) {
	const {token, user, dispatch, loading} = props;
	// Hook
	const {t} = useTranslation();
	const history = useHistory();
	const location = useLocation();
	// Handlers
	const handleClick = () => {
		history.push({
			pathname:'/login/',
			search:_.get(location, ['search']),
		});
	};
	const redirect = (type) => {
		history.push({
			pathname:PROFILE_URL,
			search:appendParamsToUrl({activeTab:type}, _.get(location, ['search'])),
		});
	};
	// Data
	const fullName = _.get(user, ['fullName'], '');
	const firstName = fullName.split(' ')[0];
	const userName = _.get(user, ['userName']);

	const title = (
		<Title>
			<p>
				@{userName}
			</p>
		</Title>
	);

	const content = (
		<Content>
			<Item onClick={() => redirect('ads')}>
				<UserIcon size={18}/>
				<p>{t('account')}</p>
			</Item>
			<Item onClick={() => redirect('settings')}>
				<SettingsIcon size={18}/>
				<p>{t('settings')}</p>
			</Item>
			<Item onClick={() => {
				dispatch(signOutAction());
				history.push({
					pathname:LOGIN_URL,
				});
				history.go(0)
			}}
			>
				<LogIn style={{transform:'rotate(180deg)'}} size={18}/>
				<p>{t('log_out')}</p>
			</Item>
		</Content>
	);
	// Render
	if (TOKEN_VALID(token)) {
		return (
			<>
				<PopoverGlobalStyle/>
				<Popover
					content={content}
					title={title}
					getPopupContainer={(trigger) => trigger.parentElement}
					trigger="click"
					placement="bottom"
				>
					<Button {...props}>
						<div style={{marginRight:'10px'}}>
							<User/>
						</div>
						<div>{useLoading(loading, firstName)}</div>
						{/*<Length>*/}
						{/*	2*/}
						{/*</Length>*/}
					</Button>
				</Popover>
			</>
		);
	}
	return (
		<Tooltip title={t('login')} placement="bottom">
			<Button onClick={handleClick} {...props}>
				<div style={{marginRight:'10px'}}>
					<LogIn/>
				</div>
				<div>{t('login')}</div>
			</Button>
		</Tooltip>
	);
}

export default enhance(AuthButton);

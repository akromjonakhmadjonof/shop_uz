import React from 'react';
import {compose, withHandlers} from 'recompose';
import {appendParamsToUrl, parseParams} from 'tools/url';
import {connect} from 'react-redux';
import _ from 'lodash';
import {useLocation} from 'react-router-dom';
import {COMPLETE_SIGN_UP_URL, PROFILE_URL} from 'location/routes';
import {reduxForm} from 'redux-form';
import Profile from './Profile';
import {Redirect} from 'react-router';
import {getUserData} from '../../../tools/storage/storage';

const enhance = compose(
	connect((state, props) => {
		const pathname = _.get(props, ['history', 'location', 'pathname']);
		const search = _.get(props, ['history', 'location', 'search']);
		const authData = _.get(state, ['auth', 'data']);
		return {
			search,
			authData,
			pathname,
		};
	}),
	withHandlers({
		handleToggleTab:(props) => (key) => {
			const {history, search} = props;
			history.push({
				pathname:PROFILE_URL,
				search:appendParamsToUrl({activeTab:key}, search),
			});
		},
		handleSetChat:(props) => (id) => {
			const {history, search} = props;
			history.push({
				pathname:PROFILE_URL,
				search:appendParamsToUrl({chatId:id}, search),
			});
		},
	}),
	reduxForm({
		form:'SettingsForm',
		enableReinitialize:true,
	}),
);

// Container
function ProfileWrapper(props) {
	// Props data
	const {authData} = props;
	// Hooks
	const location = useLocation();
	const {activeTab, chatId} = parseParams(_.get(location, ['search']));
	// Data
	const user = getUserData()
	const completed = _.get(user, ['completed']);
	// Render
	return (
		<>
			{!completed && <Redirect to={COMPLETE_SIGN_UP_URL}/>}
			<Profile
				user={authData}
				tabValue={activeTab}
				handleChangeTab={props.handleToggleTab}
				chatId={chatId}
				setChat={props.handleSetChat}
			/>
		</>
	);
}

export default enhance(ProfileWrapper);

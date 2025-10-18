import React from 'react';
import User from './User';
import {compose, withHandlers} from 'recompose';
import * as PATH from 'location/routes';
import {appendParamsToUrl, parseParams} from 'tools/url';
import _ from 'lodash';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import sprintf from 'sprintf';
import useFetchList from 'hooks/useFetchList';
import * as STATE from 'store/state';
import {userDetailsFetch, userProductsAction} from 'actions/user';
import {LoaderWrapper} from 'components/Loader/Loader';
import Loader from 'components/Loader';
import {followCreate, followDelete, followersListFetch, followingsListFetch} from 'actions/followers';
import {createChatAction} from 'actions/messages';
import Document from 'components/Document';
import {openSnackbarAction} from 'actions/snackbar';
import {t} from 'i18next';

const enhance = compose(
	connect((state, props) => {
		const pathname = _.get(props, ['history', 'location', 'pathname']);
		const search = _.get(props, ['history', 'location', 'search']);
		const data = _.get(state, ['user', 'info', 'data']);
		const loading = _.get(state, ['user', 'info', 'loading']);
		const authId = _.get(state, ['auth', 'data', 'userId']);
		const followCreateLoading = _.get(state, ['user', 'followCreate', 'loading']);
		const isFollowed = _.get(state, ['user', 'followCreate', 'data', 'isFollowed']);
		const followers = _.get(state, ['user', 'followers', 'data', 'documents']);
		const followersLoading = _.get(state, ['user', 'followers', 'loading']);
		const followingsLoading = _.get(state, ['user', 'followings', 'loading']);
		const userProducts = _.get(state, ['user', 'products', 'data', 'documents']);
		const followings = _.get(state, ['user', 'followings', 'data', 'documents']);
		return {
			isFollowed,
			userProducts,
			data,
			followers,
			followersLoading,
			followCreateLoading,
			followingsLoading,
			followings,
			authId,
			search,
			loading,
			pathname,
		};
	}),
	withHandlers({
		handleToggleTab:(props) => (key) => {
			const {history, search} = props;
			const id = _.toInteger(_.get(props, ['data', 'target']));
			history.push({
				pathname:sprintf(PATH.USER_DETAILS_URL, id),
				search:appendParamsToUrl({tab:key}, search),
			});
		},

		handleCreateChat:(props) => (id) => {
			const {dispatch, history} = props;
			dispatch(createChatAction(id, ({chat_id}) => {
				dispatch(openSnackbarAction({
					message:`${t('chat_successful_created')}!`,
				}));
				history.push({
					pathname:sprintf(PATH.MESSAGE_DETAIL_URl, chat_id),
				});
			}));
		},

		handleCreateFollow:props => (id) => {
			const {dispatch} = props;
			dispatch(followCreate(id));
		},
		handleDeleteFollow:props => (id) => {
			const {dispatch} = props;
			dispatch(followDelete(id));
		}
	})
);

// Container
const UserWrapper = (props) => {
	// Props data
	const {
		data,
		isFollowed,
		followCreateLoading,
		loading,
		authId,
		followers,
		followersLoading,
		followingsLoading,
		userProducts,
		followings
	} = props;

	// Hooks
	const location = useLocation();

	// Get url params and queries
	const {tab, ...query} = parseParams(_.get(location, ['search']));

	// Fetch
	useFetchList({
		action:userDetailsFetch,
		state:STATE.USER_DETAILS
	});

	useFetchList({
		action:followersListFetch,
		state:STATE.FOLLOWERS
	});

	useFetchList({
		action:followingsListFetch,
		state:STATE.FOLLOWINGS
	});

	useFetchList({
		action: (data) => userProductsAction(data, query),
		state:STATE.PRODUCTS
	});

	// Data

	const followersData = {
		loading:followersLoading,
		data:followers
	};

	const followingsData = {
		loading:followingsLoading,
		data:followings
	};
	const fullName = _.get(data, ['document', 'fullName']);
	// Render
	if (!loading) {
		return (
			<Document title={'shop.uz -' + fullName}>
				<User
					followers={followersData}
					isFollowed={isFollowed}
					userProducts={userProducts}
					followLoading={followCreateLoading}
					followings={followingsData}
					createFollow={props.handleCreateFollow}
					deleteFollow={props.handleDeleteFollow}
					handleChangeTab={props.handleToggleTab}
					activeTab={tab}
					authId={authId}
					createChat={props.handleCreateChat}
					data={data}
				/>
			</Document>
		);
	}
	return (
		<LoaderWrapper>
			<Loader/>
		</LoaderWrapper>
	);
};

export default enhance(UserWrapper);

import Layout from 'components/Layouts/Layout';
import DetailWrapper from 'components/Product/Detail';
import MessagesWrapper from 'components/Pages/Messages';
import HomeContainer from 'components/Pages/Home';
import FavouritesWrapper from 'components/Pages/Favourites';
import ProfileWrapper from 'components/Pages/Profile';
import ForumWrapper from 'components/Pages/Forum';
import ForBusinessWrapper from 'components/Pages/ForBusiness';
import CashbackWrapper from 'components/Pages/Cashback';
import ContactWrapper from 'components/Pages/Contact/ContactWrapper';
import AdsWrapper from 'components/Pages/Ads/AdsWrapper';
import BasketWrapper from 'components/Pages/Basket';
import CategoryWrapper from 'components/Pages/Category';
import UpdateAdsWrapper from 'components/Pages/UpdateAds';
import SignInWrapper from 'components/Pages/SignIn';
import SignUpWrapper from 'components/Pages/SignUp';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {getToken} from 'tools/storage/storage';
import * as PATH from './routes';
import UserWrapper from 'components/Pages/User';
import CompleteWrapper from 'components/Pages/SignUp/Complete';

export function TOKEN_VALID(token) {
	return token !== '' && token !== 'null' && token !== 'undefined' && token !== null && token !== undefined;
}

export const userIsAuthenticated = connectedRouterRedirect({
	authenticatedSelector:() => {
		return getToken() && true;
	},
	redirectPath:PATH.LOGIN_PATH,
	wrapperDisplayName:'UserIsAuthenticated'
});

export default [
	{
		path:PATH.REGISTER_PATH,
		component:SignUpWrapper,
		layout:Layout,
		title: '',
		onEnter:(props) => {
			const {history} = props;
			if (TOKEN_VALID(getToken())) {
				history.push({
					pathname:PATH.MAIN_PATH,
				});
			}
		},
	},
	{
		path:PATH.LOGIN_PATH,
		component:SignInWrapper,
		layout:Layout,
		title: '',
		onEnter:(props) => {
			const {history} = props;
			if (TOKEN_VALID(getToken())) {
				history.push({
					pathname:PATH.MAIN_PATH,
				});
			}
		},
	},
	{
		path:PATH.UPDATE_ADS_PATH,
		component:UpdateAdsWrapper,
		layout:Layout,
		title: ''
	},
	{
		path:PATH.BASKET_PATH,
		component: userIsAuthenticated(BasketWrapper),
		layout:Layout,
		title: 'basket'
	},
	{
		path:PATH.ADS_PATH,
		component:userIsAuthenticated(AdsWrapper),
		layout:Layout,
		title: ''
	},
	{
		path:PATH.CONTACT_PATH,
		component:ContactWrapper,
		layout:Layout,
		title: ''
	},
	{
		path:PATH.CASHBACK_PATH,
		component:CashbackWrapper,
		layout:Layout,
		title: 'discounts'
	},
	{
		path:PATH.FAVOURITES_PATH,
		component:FavouritesWrapper,
		layout:Layout,
		title: ''
	},
	{
		path:PATH.FOR_BUSINESS_PATH,
		component:ForBusinessWrapper,
		layout:Layout,
		title: 'navbar_for_business'
	},
	{
		path:PATH.FORUM_PATH,
		component:ForumWrapper,
		layout:Layout,
		title: 'navbar_faq'
	},
	{
		path:PATH.PROFILE_PATH,
		component:userIsAuthenticated(ProfileWrapper),
		layout:Layout,
		title: 'your_account',
		params:{without_padding:true},
	},
	{
		path:PATH.USER_DETAILS_PATH,
		component:UserWrapper,
		layout:Layout,
		title: ''
	},
	{
		path:PATH.COMPLETE_SIGN_UP_PATH,
		component:CompleteWrapper,
		layout:Layout,
		title: ''
	},
	{
		path:PATH.MESSAGES_PATH,
		component:userIsAuthenticated(MessagesWrapper),
		layout:Layout,
		title: 'messenger',
		params:{without_padding:true},
		routes:[
			{
				path:PATH.MESSAGE_DETAIL_PATH,
				component:userIsAuthenticated(MessagesWrapper),
				layout:Layout,
				title: 'messenger',
				params:{without_padding:true},
			},
		],
	},
	{
		path:PATH.CATEGORY_PATH,
		component:CategoryWrapper,
		layout:Layout,
		title: '',
		params:{without_padding:false},
	},
	{
		path:PATH.PRODUCT_DETAIL_PATH,
		component:DetailWrapper,
		layout:Layout,
		title: '',
		params:{without_padding:false},
	},
	{
		path:PATH.MAIN_PATH,
		component:HomeContainer,
		layout:Layout,
		title: 'home',
		params:{without_padding:false},
	},
];

import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import {createBrowserHistory} from 'history';
import rootReducer from './rootReducers';

export default (initialState) => {
	const middleware = [
		promiseMiddleware(),
		thunkMiddleware,
		routerMiddleware(createBrowserHistory()),
		createLogger({collapsed:true}),
	];
	const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
	window.store = store;
	return store;
};

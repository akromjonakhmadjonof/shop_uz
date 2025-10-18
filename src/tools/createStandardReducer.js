import createReducer from './createReducer';

const createStandardReducer = (actionName) => createReducer({
	data:null,
	loading:false,
}, {
	[actionName](state, action) {
		return {...state, data:action.data, loading:action.loading};
	},
});

export default createStandardReducer;

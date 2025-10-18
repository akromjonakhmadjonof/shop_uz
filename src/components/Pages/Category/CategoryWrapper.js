import React, {useEffect} from 'react';
import {compose, withPropsOnChange} from 'recompose';
import {reduxForm} from 'redux-form';
import {citiesListFetchAction, statesListFetchAction} from 'actions/region';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import {fetchByCategoryAction} from 'actions/category';
import {useLocation} from 'react-router-dom';
import Category from './Category';
import Document from 'components/Document';
import {useTranslation} from 'react-i18next';
import * as categories from 'constants/category';
// Enhance
const enhance = compose(
	connect((state, props) => {
		const category = _.get(props, ['match', 'params', 'categoryId']);
		const list = _.get(state, ['category', 'data', 'documents']);
		const page = _.get(state, ['category', 'data', 'page']);
		const loading = _.get(state, ['category', 'loading']);
		const countries = _.get(state, ['fields', 'counties', 'data', 'documents']);
		const cities = _.get(state, ['fields', 'cities', 'data', 'documents']);
		const states = _.get(state, ['fields', 'states', 'data', 'documents']);
		const formValues = _.get(state, ['form', 'CategoriesForm', 'values']);
		const countriesLoading = _.get(state, ['fields', 'counties', 'loading']);
		const citiesLoading = _.get(state, ['fields', 'cities', 'loading']);
		const statesLoading = _.get(state, ['fields', 'states', 'loading']);
		return {
			countries,
			cities,
			formValues,
			category,
			states,
			list,
			loading,
			page,
			countriesLoading,
			citiesLoading,
			statesLoading,
		};
	}),
	withPropsOnChange((props, nextProps) => {
		const country = _.get(props, ['formValues', 'country']);
		const newCountry = _.get(nextProps, ['formValues', 'country']);
		return country !== newCountry;
	}, ({formValues, dispatch}) => {
		const country = _.get(formValues, ['country']);
		!_.isUndefined(country) && dispatch(citiesListFetchAction(country));
	}),
	withPropsOnChange((props, nextProps) => {
		const city = _.get(props, ['formValues', 'city']);
		const newCity = _.get(nextProps, ['formValues', 'city']);
		return city !== newCity;
	}, ({formValues, dispatch}) => {
		const city = _.get(formValues, ['city']);
		!_.isUndefined(city) && dispatch(statesListFetchAction(city));
	}),
	reduxForm({
		form:'CategoriesForm',
		enableReinitialize:true,
	}),
);

function CategoryWrapper(props) {
	const {
		// countries,
		// cities,
		// countriesLoading,
		category,
		page,
		list,
		loading,
		// citiesLoading,
		// states,
		// statesLoading
	} = props;
	// Hooks
	const dispatch = useDispatch();
	const location = useLocation();
	const search = _.get(location, ['search']);
	useEffect(() => {
		dispatch(fetchByCategoryAction({search}, category));
	}, [category, search]);
	const currentCategory = _.filter(categories.category, (item) => {
		return item.href === category
	})[0]

	const {t} = useTranslation()

	const categoryName = t(_.get(currentCategory, ['label']))

	return (
		<Document title={'shop.uz - ' + t(categoryName)}>
			<Category
				list={list}
				loading={loading ? 1 : 0}
				page={page}
			/>
		</Document>
	);
}

export default enhance(CategoryWrapper);

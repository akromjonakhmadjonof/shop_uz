import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {cities, productOptions, view,} from 'constants/test/brands';
import Link from 'components/Link';
import Switch from 'components/Fields/Switch';
import {useTranslation} from 'react-i18next';
import {Field} from 'redux-form';
import CheckboxField from 'components/Fields/Checkbox';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import getSubCategories from 'tools/getSubCategories';
import {useParams} from 'react-router-dom';

// Enhance
const enhance = compose(
	connect((state) => {

	}),
);

// Styles
const Wrapper = styled('div')`
  width: 100%;
  padding-right: 30px;
`;

const SubBlock = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({margin}) => (margin ? '35px' : '0')};
  flex-direction: column;
`;

const SubTitle = styled('p')`
  font-style: normal;
  font-family: var(--medium);
  padding: 0;
  margin: 0 0 14px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 129.96%;
  color: #333333;
`;

const Group = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > label {
    margin-bottom: 11px !important;
  }

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }

`;

const CustomLink = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 19px;
  color: #4F71DC;
  margin-top: 8px;
`;

function Options() {
	const {t} = useTranslation();
	const {categoryId} = useParams()
	const subCategories = getSubCategories(categoryId)
	// Data
	const brandsGroup = (
		<Group>
			{
				_.map(subCategories, (item, key) => {
					const label = _.get(item, ['label']);
					const value = _.get(item, ['value']);
					return (
						<Field
							component={CheckboxField}
							key={key}
							name={`checkbox_${value}`}
							label={t(label)}
						/>
					);
				})
			}
			<CustomLink href="#">
				{t('view_all')}
			</CustomLink>
		</Group>
	);
	const countryGroup = (
		<Group>
			{
				_.map(cities, (item, key) => {
					const label = _.get(item, ['label']);
					return (
						<Field
							component={CheckboxField}
							name="checkbox"
							key={key}
							label={label}
						/>
					);
				})
			}
			<CustomLink href="#">
				{t('view_all')}
			</CustomLink>
		</Group>
	);
	const switches = (
		<>
			{
				_.map(productOptions, (item, key) => {
					const label = _.get(item, ['label']);
					const name = _.get(item, ['name']);
					return (
						<Field
							key={key}
							name={name}
							component={Switch}
							label={label}
						/>
					);
				})
			}
		</>
	);
	const viewGroup = (
		<Group>
			{
				_.map(view, (item, key) => {
					const label = _.get(item, ['label']);
					const value = _.get(item, ['value']);
					return (
						<Field
							key={key}
							name={`label_${value}`}
							component={CheckboxField}
							label={label}
						/>
					);
				})
			}
			<CustomLink href="#">
				{t('view_all')}
			</CustomLink>
		</Group>
	);

	// Render
	return (
		<Wrapper>
			<SubBlock>
				<SubTitle>{t('sub_categories')}</SubTitle>
				{brandsGroup}
			</SubBlock>
			{/* <SubBlock margin> */}
			{/* <SubTitle>{t('made_in')}</SubTitle> */}
			{/* {countryGroup} */}
			{/* </SubBlock> */}
			<SubBlock margin>
				{switches}
			</SubBlock>
			{/* <SubBlock margin> */}
			{/*    <Slider/> */}
			{/* </SubBlock> */}
			{/* <SubBlock margin> */}
			{/*    <SubTitle>Вид чая</SubTitle> */}
			{/*    {viewGroup} */}
			{/* </SubBlock> */}
		</Wrapper>
	);
}

export default Options;

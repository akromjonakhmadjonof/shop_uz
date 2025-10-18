import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Select as ANTD} from 'antd';
import {ChevronDown} from 'react-feather';
import _ from 'lodash';
import {Col, Row} from 'react-bootstrap';

const {Option} = ANTD;
// Styles
const Label = styled(ANTD)`
  background: #F9F9F9;
  width: 100%;

  & .ant-select-selector {
    height: 57px !important;
    border: none !important;
    border-radius: 14px !important;
    padding: 18px !important;
    background-color: #F9F9F9 !important;
    font-size: 16px !important;
  }

  & .ant-select-selection-item {
    line-height: 22px !important;
  }

  & .ant-select-arrow {
    top: 41%;
    right: 14px;
    width: 22px;
    height: 35px;
  }

  & .ant-select-selection-placeholder {
    display: flex;
    color: #7E7E7E;
    align-items: center;
  }

  position: relative !important;
  border: 1px solid #DFE0E3;
  box-sizing: border-box;
  height: ${({textarea}) => (textarea ? 'auto' : '55px')};
  min-height: 60px;
  font-size: 16px !important;

`;

const Global = createGlobalStyle`
  .rc-virtual-list-holder-inner {
    &::-webkit-scrollbar {
      width: 2px !important;
    }
  }

  .ant-select-dropdown {
    border-radius: 14px !important;
    background: #F9F9F9;
    border: 1px solid #DFE0E3;
    overflow: hidden;

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: #CDCDCD81;
      font-weight: initial !important;
    }

    .ant-select-item {
      min-height: 50px;
      display: flex;
      align-items: center;
    }
  }
`;

const Wrapper = styled(Row)`
  & > * {
    padding-right: 5px !important;
  }

  & > :first-child > div {
    border-bottom-left-radius: 14px;
    border-top-left-radius: 14px;
  }

  & > :last-child > div {
    border-bottom-right-radius: 14px;
    border-top-right-radius: 14px;
  }

  & > * {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }

  @media only screen and (max-width: 992px) {
    flex-direction: column !important;
    & > * {
      width: 100%;
    }

    & > :not(:first-child) {
      margin-top: 15px !important;
    }

    & > * > div {
      border-radius: 14px !important;
    }
  }
`;

const Empty = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    margin-bottom: 0;
    line-height: 129.96%;
    letter-spacing: 0.01em;
    color: ${({theme}) => theme.color.dark.dark_grey};
  }
`;

// Component
function RegionSearchField(props) {
	// Props Data
	const {
		city,
		cities,
		countries,
		country,
		state,
		states,
	} = props;
	// Hooks
	const {t} = useTranslation();
	// Data
	const countriesData = _.get(countries, ['data']);
	const countriesLoading = _.get(countries, ['loading']);
	const citiesData = _.get(cities, ['data']);
	const citiesLoading = _.get(cities, ['loading']);
	const statesData = _.get(states, ['data']);
	const statesLoading = _.get(states, ['loading']);
	const emptyContent = (
		<Empty>
			<p>
				{`${t('not_found_query')} . . .`}
			</p>
		</Empty>
	);
	// Render
	return (
		<Wrapper {...props}>
			<Global/>
			<Col md={4} lg={4} xs={12} sm={12}>
				<Label
					placeholder={countriesLoading ? `${t('loading')} . . .` : t('country')}
					value={country.input.value || null}
					onChange={(e) => {
						country.input.onChange(e);
					}}
					notFoundContent={emptyContent}
					getPopupContainer={(trigger) => trigger.parentNode}
					suffixIcon={<ChevronDown/>}
					{...country}
				>
					{
						_.map(countriesData, (item, key) => {
							const name = _.get(item, ['name']);
							return (
								<Option
									value={name}
									key={key}
								>
									{t(name)}
								</Option>
							);
						})
					}
				</Label>
			</Col>
			<Col md={4} lg={4} xs={12} sm={12}>
				<Label
					notFoundContent={emptyContent}
					placeholder={citiesLoading ? `${t('loading')}...` : t('province')}
					getPopupContainer={(trigger) => trigger.parentNode}
					suffixIcon={<ChevronDown/>}
					{...city}
					value={city.input.value || null}
					onChange={(e) => {
						city.input.onChange(e);
					}}
				>
					{
						_.map(citiesData, (item) => {
							const name = _.get(item, ['name']);
							return (
								<Option
									value={name}
									key={name}
								>
									{t(name)}
								</Option>
							);
						})
					}
				</Label>
			</Col>
			<Col md={4} lg={4} xs={12} sm={12}>
				<Label
					notFoundContent={emptyContent}
					placeholder={statesLoading ? `${t('loading')}...` : t('region_city')}
					getPopupContainer={(trigger) => trigger.parentNode}
					suffixIcon={<ChevronDown/>}
					{...state}
					value={state.input.value || null}
					onChange={(e) => {
						state.input.onChange(e);
					}}
				>
					{
						_.map(statesData, (item, key) => {
							const name = _.get(item, ['name']);
							return (
								<Option
									value={name}
									key={key}
								>
									{t(name)}
								</Option>
							);
						})
					}
				</Label>
			</Col>
		</Wrapper>
	);
}

export default RegionSearchField;

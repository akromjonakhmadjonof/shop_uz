import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Select as ANTD} from 'antd';
import {ChevronDown, X} from 'react-feather';
import {connect} from 'react-redux';
import useFetchList from 'hooks/useFetchList';
import {tagsListFetchAction} from 'actions/tags';
import {TAGS_LIST} from 'store/state';
import {compose} from 'recompose';
import _ from 'lodash';
import Empty from 'components/Empty';
import {value} from 'lodash/seq';

const {Option} = ANTD;

// Styles
const Label = styled(ANTD)`
  .ant-select-selection-overflow {
    height: 30px;
    overflow: auto;
  }
  background: #F9F9F9;
  width: 100%;

  & .ant-select-selection-overflow {
    margin-top: -5px;
  }

  & input {
    font-size: 16px !important;

    outline: none !important;

    &:after {
      display: none !important;
    }

  }

  & .ant-select-selector {
    min-height: 58px !important;
    max-height: 58px !important;
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
    margin-left: 14px;
    margin-top: 1px;
    color: #7E7E7E;
    align-items: center;
  }

  position: relative !important;
  border: 1px solid #DFE0E3;
  box-sizing: border-box;
  min-height: 54px;
  border-radius: 14px;
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

const Text = styled('p')`
  width: auto;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 5px;
  margin-left: 8px;
  font-size: 17px;
  line-height: 19px;
  cursor: text;
  color: ${({theme}) => theme.color.dark.dark_grey};
`;

const Wrapper = styled('div')`
  width: ${({fullWidth, width}) => width || fullWidth && '100%'};
`;

const enhance = compose(
	connect((state) => {
		const data = _.get(state, ['tags', 'data', 'documents']);
		return {
			data,
		};
	}),
);

// Component
function TagSearch(props) {
	// Props Data
	const {
		label,
		data,
		placeholder,
		input,
	} = props;
	// Data
	const {onChange} = input;
	// Hooks
	const {t} = useTranslation();
	// Axios request
	useFetchList({
		action:tagsListFetchAction,
		state:TAGS_LIST,
	});
	// Render
	return (
		<Wrapper {...props}>
			<Text>
				{t(label) || t('search_by_teg')}
			</Text>
			<Global/>
			<Label
				removeIcon={<X size={14} stroke="#333"/>}
				tokenSeparators={[',']}
				notFoundContent={<Empty/>}
				mode="tags"
				value={_.get(input, ['value']) !== '' ? _.get(input, ['value'])  : null}
				onChange={onChange}
				placeholder={t(placeholder) || `${t('search_by_teg')} . . .`}
				getPopupContainer={(trigger) => trigger.parentNode}
				menuItemSelectedIcon={<X stroke="#333" size={16}/>}
				suffixIcon={<ChevronDown/>}
			>
				{
					_.map(data, (item, key) => _.map(item, (i, index) => (
						<Option key={Math.random(index, key)} value={i}>{i}</Option>
					)))
				}
			</Label>
		</Wrapper>
	);
}

export default enhance(TagSearch);

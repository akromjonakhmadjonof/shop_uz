import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Select as ANTD} from 'antd';
import {ChevronDown} from 'react-feather';
import _ from 'lodash';

const {Option} = ANTD;

// Styles
const Label = styled(ANTD)`
  background: #F9F9F9;
  width: 100%;


  & input {
    display: none;
  }

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

// Component
function Select(props) {
	// Props Data
	const {
		label,
		placeholder,
		input,
		data,
	} = props;
	// Data
	const {onChange, value} = input;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper {...props}>
			<Text>
				{t(label)}
			</Text>
			<Global/>
			<Label
				{...input}
				value={value || null}
				onChange={onChange}
				placeholder={t(placeholder)}
				getPopupContainer={(trigger) => trigger.parentNode}
				suffixIcon={<ChevronDown/>}
			>
				{
					_.map(data, (item, key) => {
						const label = _.get(item, ['label']);
						const id = _.get(item, ['id']);
						return (
							<Option
								value={id}
								key={key}
							>
								{t(label)}
							</Option>
						);
					})
				}
			</Label>
		</Wrapper>
	);
}

export default Select;

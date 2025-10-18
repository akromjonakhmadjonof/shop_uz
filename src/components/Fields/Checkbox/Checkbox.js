import React from 'react';
import {Checkbox as ANTDCheckbox} from 'antd';
import styled from 'styled-components';

// Styles
const CustomCheckbox = styled(ANTDCheckbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background: #4F71DC;
    border-color: #4F71DC;
  }

  .ant-checkbox + span {
    padding: 0;
  }

  .ant-checkbox-inner {
    width: ${({size}) => size};
    border: 1.5px solid #DFE0E3;
    height: ${({size}) => size};
    border-radius: 4px !important;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  .ant-checkbox-checked::after {
    border-color: #4F71DC;
    border-radius: 4px;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #4F71DC !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    width: 7.714286px;
    height: 12.142857px;
    top: 45%;
    left: 25.5%;
  }

  .label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    margin-left: 8px;
    line-height: 129.96%;
    letter-spacing: 0.01em;
    color: ${({theme}) => theme.color.dark.dark_grey};
  }

  & > :nth-child(2) {
    height: 18px;
  }

  &.active .label {
    color: #4F71DC;
  }

`;

// Component
function CheckboxField(props) {
	// Props Data
	const {label, size, input} = props;
	// Data
	const {
		onChange,
		value,
	} = input;
	// Render
	return (
		<CustomCheckbox className={value ? 'active' : ''} checked={value} onChange={onChange} size={size}>
			<span className="label">{label}</span>
		</CustomCheckbox>
	);
}

// Default props
CheckboxField.defaultProps = {
	size:'20px',
};

export default CheckboxField;

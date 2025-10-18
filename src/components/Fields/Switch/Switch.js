import React from 'react';
import {Switch as ANTDSwitch} from 'antd';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const Row = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({label, flex}) => (flex || label ? 'space-between' : 'flex-start')};
`;
const Text = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #333333;
  margin: 0;
  padding: 9px 0;

`;
const CustomSwitch = styled(ANTDSwitch)`
  width: 45px;
  height: 26px;

  .ant-switch-handle {
    position: absolute;
    top: 4px;
    left: 4px;

    &:before {
      background: #FFFFFF;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    }
  }

  &.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 18px - 5px);
  }

  &.ant-switch-checked {
    background-color: #4F71DC;
  }

  background-color: #D6DBE0;
`;

function Switch(props) {
	const {
		label,
		input,
		meta,
		flex,
	} = props;
	const {
		onBlur,
		onChange,
		onDragStart,
		onDrop,
		onFocus,
		value,
	} = input;
	const {t} = useTranslation();
	return (
		<Row label={label} flex={flex}>
			<Text>
				{t(label)}
			</Text>
			<CustomSwitch
				{...input}
				defaultChecked={value}
				value={value || false}
				onChange={onChange}
				onDragStart={onDragStart}
				onDrop={onDrop}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</Row>
	);
}

export default Switch;

import React, {useState} from 'react';
import {Slider as MUISlider} from '@material-ui/core';
import styled from 'styled-components';
import _ from 'lodash';

const CustomSlider = styled(MUISlider)`
  .MuiSlider-rail {
    background-color: #DFE0E3;
    height: 5px;
  }

  .MuiSlider-track {
    height: 5px;
  }

  .MuiSlider-thumb {
    background: #FFFFFF;
    border: 2px solid #4F71DC;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    top: 12.5px;
    border-radius: 50%;
  }
`;

const Wrapper = styled('div')`

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

const Label = styled('label')`
  width: 48%;
  padding: 10px 13px;
  background: #FFFFFF;
  border: 1px solid #DFE0E3;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 46px;
`;

const Row = styled('div')`
  margin-top: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 145%;
  color: #A1A5AE;
  mix-blend-mode: normal;
  margin: 0;
`;

const Value = styled('p')`
  font-style: normal;
  padding-left: 8px;
  font-weight: normal;
  font-size: 15px;
  line-height: 145%;
  color: #333333;
  mix-blend-mode: normal;
  margin: 0;
`;

function Slider() {
	const [value, setValue] = useState([0, 500]);
	const handleChange = (value, newValue) => {
		setValue(newValue);
	};

	return (
		<Wrapper>
			<SubTitle>
				Вес, г
			</SubTitle>
			<CustomSlider
				value={value}
				onChange={handleChange}
				min={0}
				max={500}
				valueLabelDisplay="auto"
			/>
			<Row>
				<Label>
					<Text>
						от
					</Text>
					<Value>
						{_.get(value, ['0'])}
					</Value>
				</Label>
				<Label>
					<Text>
						до
					</Text>
					<Value>
						{_.get(value, ['1'])}
					</Value>
				</Label>
			</Row>
		</Wrapper>
	);
}

export default Slider;

import React from 'react';
import _ from 'lodash';
import {Field} from 'redux-form';
import Upload from 'components/Fields/Upload';
import styled from 'styled-components';
import {Info} from 'react-feather';
import {useTranslation} from 'react-i18next';
import {Tooltip} from 'antd';

// Styles
const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-top: ${({mt}) => mt || '20px'};
  width: 100%;

  & > :not(:first-child) {
    margin-left: 20px;
  }
`;

const Description = styled('div')`
  font-size: 18px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  line-height: 35px;
`;

const StyledInfo = styled('div')`
  min-width: 30px;
  height: 30px;
  margin-top: 2px;
  margin-right: 10px;
`;

// Component
function Avatars() {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<>
			<Wrapper mt="30px">
				{
					_.map([1, 2, 3, 4], (item, key) => (
						<Field
							key={key}
							name={`avatar_${item}`}
							component={Upload}
						/>
					))
				}
			</Wrapper>
			<Wrapper mt="20px">
				{
					_.map([5, 6, 7, 8], (item, key) => (
						<Field
							key={key}
							name={`avatar_${item}`}
							component={Upload}
						/>
					))
				}
			</Wrapper>
			<Description>
				<Tooltip placement="top" title={t('note')}>
					<StyledInfo>
						<Info size={26}/>
					</StyledInfo>
				</Tooltip>
				<p>
					{t('note_avatar')}
				</p>
			</Description>
		</>
	);
}

export default Avatars;

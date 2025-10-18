import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Plus} from 'react-feather';
import _ from 'lodash';
import {settings} from 'constants/settings';
import {useHistory, useLocation} from 'react-router-dom';
import {appendParamsToUrl, parseParams} from 'tools/url';
import {useDispatch} from 'react-redux';
import {change} from 'redux-form';

// Styles
const Title = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-family: var(--base-font-family);
  font-size: 20px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${({theme}) => theme.color.dark.dark_grey};
  margin-bottom: 0;
`;

const Wrapper = styled('form')`
  width: 100%;
  padding: 25px 0;
`;

const ItemContent = styled('div')`
  width: 100%;
  background: #F6F7FA;
  height: 83px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 26px 36px;
`;

const Items = styled('div')`
  & > :not(:first-child) {
    margin: 20px 0;
  }
`;

const Icon = styled('div')`
  min-width: 42px;
  max-width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background: #4F71DC;
  transition: 0.5s all ease;

  & > svg line {
    stroke: #ffffff;
  }

  &.active {
    transition: 0.5s all ease;
    background: #ffffff;
    border: 1px solid ${({theme}) => theme.border.color.primary};

    & > svg > :first-child {
      display: none;
    }

    & > svg line {
      stroke: #4F71DC;
    }
  }
`;

const ItemScroller = styled('div')`
  width: 100%;
  max-height: 83px;
  transition: 0.5s all ease;
  overflow: hidden;

  &.active {
    max-height: 600px;

    &::-webkit-scrollbar {
      width: 0;
    }

    overflow: auto;
    transition: 0.5s all ease
  }
`;

const Content = styled('div')`
  width: 100%;
  background: #F6F7FA;
  height: auto;
  cursor: inherit;
  margin-top: 10px;
  border-radius: 10px;
  padding: 26px 36px;
`;

// Component
function Settings(props) {
	const {onSubmit} = props;
	// Render
	return (
		<Wrapper onSubmit={onSubmit}>
			<Items>
				{
					_.map(settings, (item, key) => (
						<Item key={key} data={{...item}}/>
					))
				}
			</Items>
		</Wrapper>
	);
}

// Component
function Item(props) {
	// Props data
	const {data} = props;
	// Hooks
	const {t} = useTranslation();
	const location = useLocation();
	const dispatch = useDispatch();
	const {set} = parseParams(_.get(location, ['search']));
	const history = useHistory();
	// Data
	const text = _.get(data, ['text']);
	const id = _.get(data, ['id']);
	const fields = _.get(data, ['fields']);
	const isActive = Number(set) === Number(id);
	const handleRedirect = () => {
		if (isActive) {
			dispatch(change('SettingsForm', 'type', ''));
			history.push({
				pathname:_.get(location, ['pathname']),
			});
		} else {
			dispatch(change('SettingsForm', 'type', text));
			history.push({
				pathname:_.get(location, ['pathname']),
				search:appendParamsToUrl({set:id}, _.get(location, ['search'])),
			});
		}
	};
	// Render
	return (
		<ItemScroller className={'active'}>
			<ItemContent onClick={handleRedirect}>
				<Title>
					{t(text)}
				</Title>
				<Icon className={'active'}>
					<Plus size={22}/>
				</Icon>
			</ItemContent>
			<Content>
				{fields}
			</Content>
		</ItemScroller>
	);
}

export default Settings;

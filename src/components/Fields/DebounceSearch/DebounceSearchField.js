import React, {useCallback} from 'react';
import _ from 'lodash';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router';
import {appendParamsToUrl, parseParams} from 'tools/url';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const SearchInput = styled('input')`
  width: 95%;
  border-radius: 7px;
  border: 1px solid #e1e1e1;
  outline: none;
  height: 100%;
  ${({styles}) => styles}
  padding: 5px 10px;
`;

const SearchField = styled('label')`
  width: 100%;
  height: 79px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
`;

// Component
const DebounceSearchField = (props) => {
	const {
		param = 'search',
		debounceTime = 1000,
		placeholder,
		inputStyles = {}
	} = props;
	// Hooks
	const history = useHistory();
	const location = useLocation();
	const {t} = useTranslation();
	// Data
	const search = _.get(location, ['search']);
	const query = parseParams(search);
	const searchInitialValue = _.get(query, [param]);
	const pathname = _.get(location, ['pathname']);
	// Handlers
	const onChange = (query) => {
		const value = _.get(query, ['target', 'value']);
		history.push({
			pathname:pathname,
			search:appendParamsToUrl({[param]:value}, search)
		});
	};
	const debounce = useCallback(_.debounce(onChange, debounceTime), []);
	// Render
	return (
		<SearchField>
			<SearchInput
				styles={inputStyles}
				onChange={debounce}
				autocomplete="off"
				type={'search'}
				autoCorrect="off"
				defaultValue={searchInitialValue}
				spellCheck="off"
				placeholder={t(placeholder)}
			/>
		</SearchField>
	);
};

export default DebounceSearchField;

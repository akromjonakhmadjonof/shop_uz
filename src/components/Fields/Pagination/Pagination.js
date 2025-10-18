import React from 'react';
import {Pagination as ANTDPagination} from 'antd';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router';
import _ from 'lodash';
import {appendParamsToUrl, parseParams} from 'tools/url';

// Styles
const CustomPagination = styled(ANTDPagination)`
  display: flex;
  color: #69707E;

  .ant-pagination-options {
    display: none;
  }

  .ant-pagination-item {
    background: #F2F2F2;
    border: none;
  }

  .ant-pagination-item-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border: none;
    background-color: #4F71DC;
	&:hover {
      color: #ffffff !important;
    }
    & svg path {
      fill: #fff;
    }

    &:disabled {
      opacity: 0.5;
      background-color: #F2F2F2;

      & svg path {
        fill: #333333 !important;
      }
    }
  }

  .ant-pagination-item-active {
    background-color: #4F71DC;
    color: white !important;
    & > a:hover {
      color: white !important;
    }
  }

  .ant-pagination-item {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }

  .ant-pagination-jump-next, .ant-pagination-jump-prev {
		border-radius: 2px !important;
    & svg path {
      fill: #fff;
    }

    .ant-pagination-item-ellipsis {
      color: #fff;
      margin-left: -4px;
    }
    .anticon-double-right svg {
      margin-top: -5px;
		}
  }
`;

// Component
function Pagination(props) {
	// Props data
	const {total} = props;
	// Hooks
	const history = useHistory();
	const location = useLocation();
	const search = _.get(location, ['search']);
	const searchObj = parseParams(search);
	const page = _.get(searchObj, ['page']) || 1;
	// Handler
	const onChange = (e) => {
		history.push({
			pathname:_.get(location, ['pathname']),
			search:appendParamsToUrl({page:e}, search),
		});
	};
	// Render
	return (
		<CustomPagination onChange={onChange} total={total} defaultCurrent={page}/>
	);
}

export default Pagination;

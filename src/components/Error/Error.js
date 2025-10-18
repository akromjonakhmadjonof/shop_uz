import React from 'react';
import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import {Modal} from 'antd';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {errorDialogClose} from 'actions/dialog';
import {X, XOctagon} from 'react-feather';
import _ from 'lodash';

// Enhance
const enhance = compose(
	connect((state) => {
		const open = _.get(state, ['error', 'open']);
		const title = _.get(state, ['error', 'title']);
		const data = _.get(state, ['error', 'data']);
		return {
			open,
			title,
			data,
		};
	}),
);

// Styles
const Header = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled('h1')`
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #333333;
`;

const Icon = styled('div')`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Content = styled('div')`
  & p {
    font-size: 16px;
  }
  & svg {
    margin-right: 8px;
    margin-top: 2px;
  }
  display: flex;
`;

function Error(props) {
	const {
		open,
		title,
		data,
	} = props;
	const message = _.get(data, ['message']);
	const okButtonStyles = {
		background:'#dc3545',
		border:'1px solid #dc3545',
		width:'80px',
	};
	// Hooks
	const {t} = useTranslation();
	const dispatch = useDispatch();
	// Handlers
	const handleClose = () => {
		dispatch(errorDialogClose());
	};
	// Data
	const header = (
		<Header>
			<Title>
				{t(title)}
			</Title>
			<Icon onClick={handleClose}><X size={18}/></Icon>
		</Header>
	);
	return (
		<Modal
			okText={t('ok')}
			zIndex={100000}
			visible={open}
			cancelButtonProps={{style:{display:'none'}}}
			okButtonProps={{style:okButtonStyles}}
			onOk={handleClose}
			title={header}
			closable={false}
		>
			<Content>
				<div>
					<XOctagon stroke="#dc3545" size={25}/>
				</div>
				<p>{message}</p>
			</Content>
		</Modal>
	);
}

export default enhance(Error);

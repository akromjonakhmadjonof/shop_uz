import React from 'react';
import {Modal} from 'antd';
import {X} from 'react-feather';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import {dialogClose} from 'actions/dialog';
import _ from 'lodash';

// Enhance
const enhance = compose(
	connect((state) => {
		const open = _.get(state, ['dialog', 'open']);
		const title = _.get(state, ['dialog', 'title']);
		const description = _.get(state, ['dialog', 'description']);
		const onSubmit = _.get(state, ['dialog', 'onSubmit']);
		return {
			open,
			title,
			description,
			onSubmit,
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
  font-size: 16px;
`;

// Component
function Dialog(props) {
	const {
		open,
		title,
		onSubmit,
		description,
	} = props;
	// Hooks
	const {t} = useTranslation();
	const dispatch = useDispatch();
	// Handlers
	const handleClose = () => {
		dispatch(dialogClose());
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
	const okButtonStyles = {
		background:'#198754',
		border:'1px solid #198754',
	};
	const cancelButtonStyles = {
		background:'#dc3545',
		border:'1px solid #dc3545',
		color:'#fff',
	};
	const onOk = () => {
		onSubmit();
		dispatch(dialogClose());
	};

	// Render
	return (
		<Modal
			okText={t('confirm')}
			zIndex={100000}
			visible={open}
			onOk={onOk}
			okButtonProps={{style:okButtonStyles}}
			cancelButtonProps={{style:cancelButtonStyles}}
			onCancel={handleClose}
			cancelText={t('cancel')}
			title={header}
			closable={false}
		>
			<Content>
				{t(description)}
			</Content>
		</Modal>
	);
}

export default enhance(Dialog);

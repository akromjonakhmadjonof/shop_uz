import React from 'react';
import styled from 'styled-components';
import {Button, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Field} from 'redux-form';
import TextField from 'components/Fields/TextField';
import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import {getUserData} from 'tools/storage/storage';
import {deleteAccountAction} from 'actions/auth';

// Styles
const StyledButton = styled(Button)`
  width: 99%;
  height: 45px;
`;

const CustomRow = styled(Row)`
  margin-top: 20px;

  & > :first-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  & > * {
    margin-top: 0;
  }

  @media only screen and (max-width: 768px) {
    & > * {
      justify-content: center;
    }

    & > :not(:first-child) {
      margin-top: 15px;
    }
  }

  & > :last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

// Enhance
const enhance = compose(
	connect((state) => {
		const confirmDelete = _.get(state, ['form', 'SettingsForm', 'values', 'confirmDelete']);
		const user = JSON.parse(getUserData());
		return {
			confirmDelete,
			user,
		};
	}),
);

// Component
function DeleteFields(props) {
	// Props data
	const {confirmDelete, user} = props;
	// Data
	const userName = _.get(user, ['login', 'user_name']);
	const disabled = confirmDelete !== userName;
	// Hooks
	const {t} = useTranslation();
	const dispatch = useDispatch();
	// Render
	return (
		<>
			<Row>
				<Col xs={12}>
					<Field
						name="confirmDelete"
						component={TextField}
						label={`${t('enter_to_confirm')} ${userName}`}
						placeholder={t('confirm_command')}
					/>
				</Col>
			</Row>
			<CustomRow>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton
						variant="danger"
						onClick={() => dispatch(deleteAccountAction())}
						disabled={disabled}
					>
						{t('delete_account')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="success" disabled={disabled}>
						{t('freeze_account')}
					</StyledButton>
				</Col>
			</CustomRow>
		</>
	);
}

export default enhance(DeleteFields);

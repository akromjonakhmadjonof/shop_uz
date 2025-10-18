import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Field} from 'redux-form';
import TextField from 'components/Fields/TextField';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

// Styles
const StyledButton = styled(Button)`
  width: 99%;
  height: 45px;
`;

const CustomRow = styled(Row)`
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

// Component
function PasswordFields() {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<>
			<CustomRow>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						label={t('password')}
						name="password"
						placeholder={t('enter_password')}
						type="password"
					/>
				</Col>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						label={t('confirm_password')}
						name="confirmPassword"
						placeholder={t('confirm_password')}
						type="password"
					/>
				</Col>
			</CustomRow>
			<CustomRow>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="danger">
						{t('reset_changes')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton type="submit" variant="success">
						{t('save_changes')}
					</StyledButton>
				</Col>
			</CustomRow>
		</>
	);
}

export default PasswordFields;

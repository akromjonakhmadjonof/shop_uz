import React from 'react';
import {useTranslation} from 'react-i18next';
import TextField from 'components/Fields/TextField';
import {Field} from 'redux-form';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {ChevronLeft} from 'react-feather';

// Styles
const StyledButton = styled(Button)`
  width: 100%;
  height: 45px;
  font-size: 16px !important;
`;

const Wrapper = styled('div')`
  width: 100%;

  & > :not(:first-child) {
    margin-top: 20px;
  }
`;

const ButtonGroup = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;

  & > :first-child {
    width: ${({isSignIn}) => (isSignIn ? '100%' : '10%')};
    margin-right: 10px;
    min-width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Component
function RegisterFields(props) {
	const {isSignIn, handleSetFace, face} = props;
	const {t} = useTranslation();
	return (
		<Wrapper>
			<Field
				name="userName"
				label="user_name"
				placeholder="enter_user_name"
				required
				component={TextField}
			/>
			<Field
				name="password"
				type="password"
				label="password"
				required
				placeholder="enter_password"
				component={TextField}
			/>
			{!isSignIn && (
				<Field
					name="confirmPassword"
					required
					type="password"
					label="confirm_password"
					placeholder="confirm_password"
					component={TextField}
				/>
			)}
			<ButtonGroup isSignIn={isSignIn}>
				{!isSignIn && (
					<StyledButton onClick={() => handleSetFace(face)} variant="success" type="button">
						<ChevronLeft/>
					</StyledButton>
				)}
				<StyledButton variant="success" type="submit">
					{isSignIn ? t('sign_in') : t('sign_up')}
				</StyledButton>
			</ButtonGroup>
		</Wrapper>
	);
}

export default RegisterFields;

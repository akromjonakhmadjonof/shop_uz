import React from 'react';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Field} from 'redux-form';
import TextField from 'components/Fields/TextField';
import normalizePhone from 'tools/normalizePhone';
import {ChevronLeft} from 'react-feather';
import {minLength} from 'tools/validators';

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
    width: 10%;
    margin-right: 10px;
    min-width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Component
function IndividualFields(props) {
	// Props data
	const {handleSet} = props;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Field
				name="fullName"
				label="full_name"
				validate={minLength}
				placeholder="enter_full_name"
				component={TextField}
			/>
			<Field
				name="email"
				type="email"
				label="email"
				placeholder="enter_email"
				component={TextField}
			/>
			<Field
				name="phoneNumber"
				parse={normalizePhone}
				label="phone_number"
				placeholder="enter_phone_number"
				component={TextField}
			/>
			<ButtonGroup>
				<StyledButton onClick={handleSet} variant="success" type="button">
					<ChevronLeft/>
				</StyledButton>
				<StyledButton type="submit" variant="success">
					{t('next_step')}
				</StyledButton>
			</ButtonGroup>
		</Wrapper>
	);
}

export default IndividualFields;

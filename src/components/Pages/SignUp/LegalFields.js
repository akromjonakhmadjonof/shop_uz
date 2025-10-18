import React from 'react';
import {Field} from 'redux-form';
import TextField from 'components/Fields/TextField';
import Select from 'components/Fields/Select';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import normalizePhone from 'tools/normalizePhone';
import {ChevronLeft} from 'react-feather';
import {category} from 'constants/category';

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
function LegalFields(props) {
	// Props data
	const {handleSetFace, handleSet} = props;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Field
				required
				name="company"
				label="company"
				placeholder="enter_company"
				component={TextField}
			/>
			<Field
				name="direction"
				component={Select}
				data={category}
				label="direction"
				placeholder="enter_direction"
			/>
			<Field
				name="brand"
				component={TextField}
				label="brand"
				placeholder="enter_brand"
			/>
			<Field
				name="email"
				type="email"
				component={TextField}
				label="email"
				placeholder="enter_email"
			/>
			<Field
				name="phoneNumber"
				parse={normalizePhone}
				component={TextField}
				label="phone_number"
				placeholder="enter_phone_number"
			/>
			<ButtonGroup>
				<StyledButton onClick={handleSet} variant="success">
					<ChevronLeft/>
				</StyledButton>
				<StyledButton type="submit" variant="success">
					{t('next_step')}
				</StyledButton>
			</ButtonGroup>
		</Wrapper>
	);
}

export default LegalFields;

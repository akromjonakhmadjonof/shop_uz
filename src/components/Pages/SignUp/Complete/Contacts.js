import React from 'react';
import {Field, FieldArray} from 'redux-form';
import TextField from 'components/Fields/TextField';
import normalizePhone from 'tools/normalizePhone';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'react-bootstrap';
import {Minus, Plus} from 'react-feather';
import _ from 'lodash';

// Styles
const Wrapper = styled('div')`
  display: flex;
  width: 98%;
  flex-direction: column;

  & > :not(:first-child) {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  width: 97%;
  margin-top: 15px;
  height: 45px;
`;

const CustomRow = styled(Row)`
  width: 100%;

  & > :first-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  @media only screen and (max-width: 768px) {
    & > * {
      & > * {
        width: 100% !important;
      }

      justify-content: flex-start !important;
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
const Contacts = (props) => {
	// Props data
	const {name, label, placeholder} = props;
	// Hooks
	const {t} = useTranslation();
	// Constants
	const renderFields = (data) => {
		const {fields} = data;
		return (
			<Wrapper>
				{
					fields.map((item, index) => {
						const values = fields.get(index);
						const disabledMinus = fields.length === 1;
						const disabledPlus = !_.get(values, ['phone']);
						return (
							<div
								style={{width:'100%'}}
								key={index}
							>
								<Field
									fullWidth
									parse={name === 'phones' ? normalizePhone : (val) => {
										return val;
									}}
									name={item + 'phone'}
									component={TextField}
									label={t(label) + ` № ${index + 1}`}
									placeholder={placeholder}
								/>
								<CustomRow>
									<Col xs={12} md={6} lg={6} sm={12}>
										<StyledButton disabled={disabledMinus} variant="danger"
													  onClick={() => fields.remove(index)}>
											<Minus/>
										</StyledButton>
									</Col>
									<Col xs={12} md={6} lg={6} sm={12}>
										<StyledButton disabled={disabledPlus} variant="success" type="button"
													  onClick={() => fields.push({})}>
											<Plus/>
										</StyledButton>
									</Col>
								</CustomRow>
							</div>
						);
					})
				}
			</Wrapper>
		);
	};
	// Render
	return (
		<>
			<FieldArray
				name={name}
				component={renderFields}
			/>
		</>
	);
};

export default Contacts;

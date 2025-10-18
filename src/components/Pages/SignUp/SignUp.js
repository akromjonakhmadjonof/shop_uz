import React, {useState} from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import {Button, Col, Row} from 'react-bootstrap';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import {useHistory} from 'react-router-dom';
import {LOGIN_URL} from 'location/routes';
import {useDispatch} from 'react-redux';
import {change} from 'redux-form';
import RegisterFields from './RegisterFields';
import IndividualFields from './IndividualFields';
import LegalFields from './LegalFields';

// Styles
const StyledRow = styled(Row)`
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled('p')`
  font-style: normal;
  font-size: 18px;
  margin-bottom: 20px;
  font-family: var(--base-font-family);
  line-height: 34px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${({theme}) => theme.color.dark.dark_grey};
  color: ${({theme}) => theme.color.dark.dark_grey};
  font-weight: 500;
`;

const Or = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 59px;
  margin-top: 29px;

  & p {
    font-style: normal;
    font-size: 18px;
    font-family: var(--base-font-family);
    line-height: 34px;
    display: flex;
    margin-bottom: 0;
    align-items: center;
    letter-spacing: -0.015em;
    color: ${({theme}) => theme.color.dark.dark_grey};
    color: ${({theme}) => theme.color.dark.dark_grey};
    font-weight: 500;
    margin-left: -60px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      width: 50px;
      background: #222C46;
      height: 1px;
      left: -70px;
      bottom: 35%;
    }

    &:after {
      content: '';
      position: absolute;
      width: 50px;
      background: #222C46;
      height: 1px;
      right: -70px;
      bottom: 35%;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 45px;
  font-size: 16px !important;
`;

const Form = styled('form')`
  width: 100%;
  padding-left: 40px;
  @media only screen and (max-width: 768px) {
    padding-left: 0;
    margin-top: 40px;
  }
`;

const ButtonGroup = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > button {
    height: 45px;
  }

  & > * {
    margin-top: 30px;
  }
`;

// Component
function SignUp(props) {
	// Props dat
	const {
		handleSignUp, face, setFace, formValues,
	} = props;
	// Hooks
	const {t} = useTranslation();
	const history = useHistory();
	const [back, setBack] = useState(null);
	const dispatch = useDispatch();
	const individualDisabled = !(_.get(formValues, ['fullName']) && _.get(formValues, ['email']) && _.get(formValues, ['phoneNumber']));
	// Handlers
	const handleRedirect = () => {
		history.push(LOGIN_URL);
	};
	const handleSetFace = (face) => {
		if (face !== 'login') {
			setBack(face);
			dispatch(change('SignUpForm', 'face', face));
		}
		return setFace(face);
	};
	const buttonGroup = (
		<ButtonGroup>
			<Button onClick={() => handleSetFace('legal')} variant="success">
				{t('legal')}
			</Button>
			<Button onClick={() => handleSetFace('individual')} variant="success">
				{t('individual')}
			</Button>
		</ButtonGroup>
	);
	// Render
	return (
		<Container>
			<StyledRow>
				<Col xs={12} md={6} sm={12} lg={6}>
					<Title>
						{t('shop_uz_community')}
					</Title>
					<Text>
						{t('community_text')}
					</Text>
					<Or>
						<p>
							{t('or')}
						</p>
					</Or>
					<StyledButton onClick={handleRedirect} variant="success">
						{t('sign_in')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} sm={12} lg={6}>
					{face !== 'login' && (
						<Form onSubmit={() => handleSetFace('login')}>
							<Title styles={{fontSize:24}}>
								{t('sign_up')}
							</Title>
							{_.isNull(face) && buttonGroup}
							{
								face === 'legal'
								&& (
									<LegalFields
										disabled
										handleSet={() => {
											setFace(null);
											setBack(null);
										}}
									/>
								)
							}
							{
								face === 'individual'
								&& (
									<IndividualFields
										handleSet={() => {
											setFace(null);
											setBack(null);
										}}
										disabled={individualDisabled}
									/>
								)
							}
						</Form>
					)}
					{face === 'login' && (
						<Form onSubmit={handleSignUp}>
							{
								face === 'login'
								&& (
									<RegisterFields
										handleSetFace={() => {
											setFace(back);
											setBack(back);
										}}
									/>
								)
							}
						</Form>
					)}
				</Col>
			</StyledRow>
		</Container>
	);
}

export default SignUp;

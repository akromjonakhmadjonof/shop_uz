import React from 'react';
import Container from 'components/Container';
import styled from 'styled-components';
import {Button, Col, Row} from 'react-bootstrap';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';
import RegisterFields from 'components/Pages/SignUp/RegisterFields';
import {useHistory} from 'react-router-dom';
import {REGISTER_URL} from 'location/routes';
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

// Component
function SignIn(props) {
	// Props data
	const {handleSubmit} = props;
	// Hooks
	const {t} = useTranslation();
	const history = useHistory();
	// Handler
	const handleRedirect = () => {
		history.push(REGISTER_URL);
	};
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
							{t('no_account')}
						</p>
					</Or>
					<StyledButton onClick={handleRedirect} variant="success">
						{t('sign_up')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} sm={12} lg={6}>
					<Form onSubmit={handleSubmit}>
						<Title styles={{fontSize:24}}>
							{t('sign_in')}
						</Title>
						<RegisterFields
							isSignIn
						/>
					</Form>
				</Col>
			</StyledRow>
		</Container>
	);
}

export default SignIn;

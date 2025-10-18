import React from 'react';
import Upload from 'components/Fields/Upload';
import {Field} from 'redux-form';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'react-bootstrap';

// Styles
const Title = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-family: var(--base-font-family);
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${({theme}) => theme.color.dark.dark_grey};
`;

const List = styled('div')`
  & > :not(:first-child) {
    margin-top: 25px;
  }

  width: 100%;
`;

const Wrapper = styled(Row)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Note = styled('div')`

`;

const Text = styled(Title)`
  font-size: 18px;
  font-weight: 500;
  line-height: 35px;
`;

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

// Component
function BannerFields() {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<Col xs={12} lg={8} md={8} sm={12}>
				<List>
					<div>
						<Title>{t('upload_banner')}</Title>
						<Field
							name="bannerUpload"
							component={Upload}
						/>
					</div>
					<div>
						<Title>{t('upload_logo')}</Title>
						<Field
							name="logoUpload"
							component={Upload}
						/>
					</div>
				</List>
			</Col>
			<Col xs={12} lg={4} md={4} sm={12}>
				<Note>
					<Title>
						{t('note')}
					</Title>
					<Text>
						{t('banner_note')}
					</Text>
				</Note>
			</Col>
			<CustomRow>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="danger">
						{t('reset_changes')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="success">
						{t('save_changes')}
					</StyledButton>
				</Col>
			</CustomRow>
		</Wrapper>
	);
}

export default BannerFields;

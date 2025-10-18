import React from 'react';
import Container from 'components/Container';
import {Field, reduxForm} from 'redux-form';
import Upload from 'components/Fields/Upload';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {Tooltip} from 'antd';
import {Info} from 'react-feather';
import {Button, Col, Row} from 'react-bootstrap';
import TextField from 'components/Fields/TextField';
import Contacts from './Contacts';

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

const Description = styled('div')`
  display: flex;
  margin-top: 20px;
  width: 70%;
  align-items: flex-start;
  line-height: 35px;
`;

const DescriptionWrap = styled('div')`
  width: 100%;
`;

const StyledInfo = styled('div')`
  min-width: 30px;
  height: 30px;
  margin-top: 2px;
  margin-right: 10px;
`;

const CustomRow = styled(Row)`
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
  &.flex-start {
    align-items: flex-start;
    & > div {
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
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  height: 45px;
`;

// Component
function Complete(props) {
	// Props data
	const {onSubmit} = props;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<form onSubmit={onSubmit}>
			<Container>
				<Title>
					{t('tell_yourself')}
				</Title>
				<Description>
					<Tooltip placement="top" title={t('note')}>
						<StyledInfo>
							<Info size={26}/>
						</StyledInfo>
					</Tooltip>
					<Text>{t('upload_img')}</Text>
				</Description>
				<Field
					component={Upload}
					formName={'CompleteForm'}
					name={'userImage'}
				/>
				<Description>
					<Tooltip placement="top" title={t('note')}>
						<StyledInfo>
							<Info size={26}/>
						</StyledInfo>
					</Tooltip>
					<Text>{t('required_fields')}</Text>
				</Description>
				<CustomRow>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="full_name"
							name="fullName"
							placeholder="enter_full_name"
						/>
					</Col>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="user_name"
							name="userName"
							placeholder="enter_user_name"
						/>
					</Col>
				</CustomRow>
				<Description>
					<Tooltip placement="top" title={t('note')}>
						<StyledInfo>
							<Info size={26}/>
						</StyledInfo>
					</Tooltip>
					<Text>{t('social_note')}</Text>
				</Description>
				<CustomRow>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="instagram"
							name="instagram"
							placeholder="enter_int_acc"
						/>
					</Col>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="facebook"
							name="facebook"
							placeholder="enter_fb_acc"
						/>
					</Col>
				</CustomRow>
				<CustomRow>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="twitter"
							name="twitter"
							placeholder="enter_tw_acc"
						/>
					</Col>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Field
							width="98%"
							component={TextField}
							label="telegram"
							name="telegram"
							placeholder="enter_tg_acc"
						/>
					</Col>
				</CustomRow>
				<CustomRow className={'flex-start'}>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Contacts
							name={'phones'}
							label={'phone_number'}
							placeholder={'enter_phone_number'}
						/>
					</Col>
					<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
						<Contacts
							name={'emails'}
							label={'email'}
							placeholder={'enter_email'}
						/>
					</Col>
				</CustomRow>
				<iframe
					className={'map'}
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95942.6576971641!2d69.20932726033044!3d41.28257622556548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YIsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1646568277279!5m2!1sru!2s"
					width="100%" height="300" allowFullScreen="" loading="lazy"/>

				<DescriptionWrap style={{marginTop:'20px'}}>
					<Field
						name="description"
						component={TextField}
						label="details"
						Валюта
						textarea
						placeholder="your_purpose"
					/>
				</DescriptionWrap>
				<StyledButton variant={'success'} type="submit">
					{t('save_changes')}
				</StyledButton>
			</Container>
		</form>
	);
}

Complete = reduxForm({
	form:'CompleteForm',
	enableReinitialize:true,
	initialValues:{
		phones:[{}],
		emails:[{}]
	}
})(Complete);

export default Complete;

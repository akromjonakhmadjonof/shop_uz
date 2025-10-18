import React from 'react';
import Container from 'components/Container';
import {Title} from 'components/Title';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {CheckCircle} from 'react-feather';
import {Button} from 'react-bootstrap';

// Styles
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

const List = styled('div')`
  --auto-grid-min-size: 17rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Wrapper = styled('div')`
  max-width: 100%;
  min-width: 100%;
  height: 520px;
  border-radius: ${({theme}) => theme.border.radius.primary};
  position: relative;
  transition: 0.3s all ease;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  align-items: flex-start;
  @media only screen and (max-width: 768px) {
    min-width: 95%;
    max-width: 95%;
    margin-top: 0 !important;
  }
  @media only screen and (max-width: 992px) {
    min-width: ${({full}) => (full ? '98.5%' : '95%')};
    max-width: ${({full}) => (full ? '98.5%' : '95%')};
    margin-top: ${({mt}) => (mt ? '30px' : '')};
  }
  box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};

  & > :first-child {
    opacity: 1;
    transition: 0.2s all ease;
  }

  @media only screen and (max-width: 573px) {
    max-width: 300px;
  }
  cursor: ${({loading}) => (loading ? 'wait' : 'pointer')};
`;

const Box = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  & > :first-child {
    margin-top: 10px;
  }
`;

const Price = styled(Title)`

`;

const Status = styled('div')`
  width: 140px;
  background: ${({color}) => color || '#28a97c'};
  color: white;
  padding: 5px;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  font-size: 16px;
  text-align: center;
  position: absolute;
  left: -8px;
  top: 20px;

  &:before {
    content: '';
    position: absolute;
    border-width: 4px;
    border-style: solid;
    border-color: transparent ${({color}) => color || '#28a97c'} ${({color}) => color || '#28a97c'} transparent;
    left: 0;
    top: -8px;
  }
`;

const Items = styled('div')`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-height: 267px;
  & svg {
    & > * {
      stroke: ${({color}) => color};
    }
  }
  & > * {
    margin-top: 10px;
  }
`;

const Item = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;

  & svg {
    margin-top: 2px;
    & > * {
      stroke: ${({color}) => color};
    }
  }
  & p {
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 0;
  }
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 2px solid ${({color}) => color || '#198754'};
  margin-bottom: 10px;
`;

const CustomButton = styled(Button)`
  width: 95%;
  font-size: 14px !important;
  text-align: center;
  height: 45px !important;
  border-radius: 11px;
`;

// Component
function ForBusiness() {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Container>
			<Title>
				{t('navbar_for_business')}
			</Title>
			<Text>{t('for_business_text')}</Text>
			<List>
				<Wrapper>
					<Status color="#198754">
						standard
					</Status>
					<Box>
						<Header>
							<Title>
								Standard
							</Title>
							<Price>
								5.0 $
							</Price>
						</Header>
						<Items>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>3 Banners</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>3 Logos</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>1 Month support </p>
							</Item>
						</Items>
						<CustomButton variant="success">
							{t('get_it_now')}
						</CustomButton>
					</Box>
				</Wrapper>
				<Wrapper color="#DC3545">
					<Status color="#DC3545">
						plus
					</Status>
					<Box>
						<Header color="#DC3545">
							<Title>
								Plus
							</Title>
							<Price>
								10.0 $
							</Price>
						</Header>
						<Items color="#DC3545">
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>6+ Banners</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>6+ Logos</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>2+ Month support </p>
							</Item>
						</Items>
						<CustomButton variant="danger">
							{t('get_it_now')}
						</CustomButton>
					</Box>
				</Wrapper>
				<Wrapper>
					<Status color="#198754">
						premium
					</Status>
					<Box>
						<Header>
							<Title>
								Premium
							</Title>
							<Price>
								25.0 $
							</Price>
						</Header>
						<Items>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>Unlimited banners</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>Unlimited logos</p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>10 Month support </p>
							</Item>
							<Item>
								<CheckCircle stroke="#28a97c" size={20}/>
								<p>ERP system</p>
							</Item>
						</Items>
						<CustomButton variant="success">
							{t('get_it_now')}
						</CustomButton>
					</Box>
				</Wrapper>
			</List>
		</Container>
	);
}

export default ForBusiness;

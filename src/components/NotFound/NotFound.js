import React from 'react';
import Layout from 'components/Layouts/Layout';
import Container from 'components/Container';
import {Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import {AlertTriangle} from 'react-feather';
import {Tooltip} from 'antd';
import Link from 'components/Link';

const Wrapper = styled('div')`
  width: 100%;
  height: 320px;
  border: 1px solid ${({theme}) => theme.border.color.primary};
  background: ${({theme}) => theme.background.primary};
  border-radius: 8px;
  padding: 20px;

  & .col-8 {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const CustomRow = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled('p')`
  font-style: normal;
  font-weight: 400;
  font-size: 50px;
  margin: 0;
  line-height: 65px;
  font-family: var(--semi-bold);
  text-align: center;
  color: #282828;
`;

const CustomLink = styled(Link)`
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
  
`;

function NotFound() {
	return (
		<Layout>
			<Container>
				<CustomRow>
					<Col xs={5}>
						<Wrapper>
							<Row>
								<Col xs={8}>
									<Tooltip title="Страница не найдена" placement="topLeft">
										<AlertTriangle width="100" height="100"/>
									</Tooltip>
									<Text>
										Страница не найдена
									</Text>
									<CustomLink href="/main/">
										На главную
									</CustomLink>
								</Col>
							</Row>
						</Wrapper>
					</Col>
				</CustomRow>
			</Container>
		</Layout>
	);
}

export default NotFound;

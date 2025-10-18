import React from 'react';
import {Button, Col, Row, Table,} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Switch from 'components/Fields/Switch';
import {Field} from 'redux-form';
import _ from 'lodash';
import styled from 'styled-components';

// Styles
const StyledButton = styled(Button)`
  width: 99%;
  height: 45px;
`;

const CustomRow = styled(Row)`
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

// Data
const data = [
	{
		name:'advice',
		title:'tips_title',
	},
	{
		name:'sell',
		title:'promotions_title',
	},
	{
		name:'faq',
		title:'answers_title',
	},
	{
		name:'ads',
		title:'ads_title',
	},
	{
		name:'discounts',
		title:'discounts_title',
	},
];

// Component
function NotificationFields() {
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<>
			<Row>
				<Col xs={12} sm={12} lg={12} md={12} className="mb-20">
					<Table hover>
						<tbody>
						<tr>
							<td style={{width:'25%'}}>{t('notification')}</td>
							<td style={{width:'25%', textAlign:'end'}}>{t('telegram_bot')}</td>
							<td style={{width:'25%', textAlign:'end'}}>{t('mobile_phone')}</td>
							<td style={{width:'25%', textAlign:'end'}}>{t('email')}</td>
						</tr>
						{
							_.map(data, (item, key) => {
								const title = _.get(item, ['title']);
								const name = _.get(item, ['name']);
								return (
									<tr key={key}>
										<td style={{width:'25%'}}>{t(title)}</td>
										<td style={{width:'25%'}}>
											<Field
												flex="end"
												name={`${name}telegram`}
												component={Switch}
											/>
										</td>
										<td style={{width:'25%'}}>
											<Field
												flex="end"
												name={`${name}phone`}
												component={Switch}
											/>
										</td>
										<td style={{width:'25%'}}>
											<Field
												flex="end"
												name={`${name}email`}
												component={Switch}
											/>
										</td>
									</tr>
								);
							})
						}
						</tbody>
					</Table>
				</Col>
			</Row>
			<CustomRow>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="danger">
						{t('reset_changes')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton type="submit" variant="success">
						{t('save_changes')}
					</StyledButton>
				</Col>
			</CustomRow>
		</>
	);
}

export default NotificationFields;

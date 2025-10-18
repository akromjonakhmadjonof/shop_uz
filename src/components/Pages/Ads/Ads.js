import React from 'react';
import styled from 'styled-components';
import {Field, FieldArray} from 'redux-form';
import {Button, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import TextField from 'components/Fields/TextField';
import {Title} from 'components/Title';
import Select from 'components/Fields/Select';
import {category} from 'constants/category';
import normalizePhone from 'tools/normalizePhone';
import normalizeNumber from 'tools/normalizeNumber';
import {Info} from 'react-feather';
import {Tooltip} from 'antd';
import {currency, status} from 'constants/backendConstants';
import TagSearch from 'components/Fields/TagSearch';
import Avatars from './Avatars';
import GlobalLoader from 'components/GlobalLoader';

// Styles
const Wrapper = styled('form')`
  width: 100%;
`;

const Group = styled(Row)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;

  & > :not(:first-child) {
    margin-top: 20px;
  }
`;

const Description = styled('div')`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 99%;
  margin-top: 15px;
  height: 45px;
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
`;

const StyledInfo = styled('div')`
  min-width: 30px;
  height: 30px;
  margin-top: 2px;
  margin-right: 10px;
`;

const InfoText = styled('div')`
  font-size: 18px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  line-height: 35px;
`;

// Component
function Ads(props) {
	// Props data
	const {
		loading,
		onSubmit,
		handleReset,
	} = props;

	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper onSubmit={onSubmit}>
			{loading && <GlobalLoader />}
			<Title>
				{t('say_about')}
			</Title>
			<FieldArray
				component={Avatars}
				name="avatars"
			/>
			<Group>
				<Field
					name="productName"
					component={TextField}
					label="product_name"
					placeholder="enter_product_name"
				/>
				<Field
					name="productType"
					component={Select}
					data={category}
					label="product_type"
					placeholder="enter_product_type"
				/>
			</Group>
			<CustomRow style={{marginTop:'20px'}}>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						label="price"
						parse={normalizeNumber}
						name="price"
						placeholder="enter_price"
					/>
				</Col>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						label="discount_price"
						parse={normalizeNumber}
						name="discountPrice"
						placeholder="enter_discount_price"
					/>
				</Col>
			</CustomRow>
			<CustomRow>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={Select}
						label="currency"
						name="currency"
						data={currency}
						placeholder="enter_currency"
					/>
				</Col>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={Select}
						label="status"
						data={status}
						name="status"
						placeholder="enter_status"
					/>
				</Col>
			</CustomRow>
			<Field
				component={TagSearch}
				name="tags"
				label="enter_tags"
				placeholder="enter_tags"
			/>
			<Description style={{marginTop:'20px'}}>
				<Field
					name="description"
					component={TextField}
					label="description"
					Валюта
					textarea
					placeholder="enter_description"
				/>
			</Description>
			<CustomRow style={{marginTop:'20px'}}>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						parse={normalizePhone}
						label="phone_number"
						name="phoneNumber"
						placeholder="enter_phone_number"
					/>
				</Col>
				<Col xs={12} sm={12} lg={6} md={6} className="mb-20">
					<Field
						width="98%"
						component={TextField}
						label="contact_person"
						name="contactPerson"
						placeholder="contact_person"
					/>
				</Col>
			</CustomRow>
			<CustomRow style={{marginBottom:'20px'}}>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="danger" type="reset" onClick={handleReset}>
						{t('reset_changes')}
					</StyledButton>
				</Col>
				<Col xs={12} md={6} lg={6} sm={12}>
					<StyledButton variant="success" type="submit">
						{t('create_prod')}
					</StyledButton>
				</Col>
			</CustomRow>
			<InfoText>
				<Tooltip placement="top" title={t('note')}>
					<StyledInfo>
						<Info size={26}/>
					</StyledInfo>
				</Tooltip>
				<p>
					{t('note_prod')}
				</p>
			</InfoText>
		</Wrapper>
	);
}

export default Ads;

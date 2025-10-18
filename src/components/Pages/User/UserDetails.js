import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import Description from 'components/Description';
import normalizePhone from 'tools/normalizePhone';
import _ from 'lodash';
// Styles
const Wrapper = styled('div')`
  width: 100%;
  padding-top: 20px;
`;


const ProdDescription = styled('div')`
  width: 100%;
  height: auto;
  line-height: 35px;
  appearance: none !important;
  visibility: visible;
  outline: none;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 14px;
  background: #fafafa;
  font-size: 17px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Descriptions = styled(ProdDescription)`
  font-size: 16px;
  line-height: 25px;
  margin-top: 20px;

  & > :not(:nth-child(1)), :not(:nth-child(2)) {
    margin-top: 15px;
  }
`;

const Title = styled('h4')`
  font-weight: 600;
  margin-top: -5px;
`;

// Component
const UserDetails = (props) => {
	const {data} = props;
	// Data
	const info = _.get(data, ['info']);
	const phones = _.get(data, ['phones']);
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<Wrapper>
			<ProdDescription readOnly>
				<Title>
					{t('description')}
				</Title>
				{info}
			</ProdDescription>
			<Descriptions>
				<Title>
					{t('address')}
				</Title>
				<iframe
					className={'map'}
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95942.6576971641!2d69.20932726033044!3d41.28257622556548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YIsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1646568277279!5m2!1sru!2s"
					width="100%" height="300" allowFullScreen="" loading="lazy"/>

				<Title style={{marginBottom:'25px'}}>
					{t('more_contacts')}
				</Title>
				{
					_.size(phones) > 1 && _.map(phones, (item, index) => {
						return (
							<Description key={index} parent={t('phone_number') + ' #' + Number(index + 1)} child={normalizePhone(item)}/>
						);
					})
				}
			</Descriptions>
		</Wrapper>
	);
};

export default UserDetails;

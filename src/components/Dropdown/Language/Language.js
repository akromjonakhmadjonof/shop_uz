import React, {useState} from 'react';
import Globe from 'media/icons/globus';
import getLanguage, {getLanguageKey} from 'tools/getLanguage';
import styled from 'styled-components';
import {Dropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {setLanguage} from 'tools/storage/storage';

// Style
const Wrapper = styled('div')`
  .dropdown-item {
    &:active {
      background-color: #e9ecef !important;
      color: #3B68CD !important;
    }
  }
`;

const MenuText = styled(Dropdown.Toggle)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;

  & svg path {
    fill: white;
  }

  &:after {
    margin-left: 10px;
  }

  align-items: center;
  letter-spacing: -0.005em;
  color: white;
  margin: 0;
`;

// Component
function Language() {
	// Hook
	const {t, i18n} = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(getLanguage(getLanguageKey()));
	// Handlers
	const handleSetLanguage = (key) => {
		setLanguage(key, true);
		setCurrentLanguage(getLanguage(getLanguageKey()));
		i18n.changeLanguage(key);
	};
	return (
		<Wrapper>
			<Dropdown>
				<MenuText variant="success" id="dropdown-basic">
					<Globe/>
					{currentLanguage}
				</MenuText>
				<Dropdown.Menu flip>
					<Dropdown.Item onClick={() => handleSetLanguage('en')}>{t('english')}</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSetLanguage('ru')}>{t('russia')}</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSetLanguage('uz')}>{t('uzbek')}</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Wrapper>
	);
}

export default Language;

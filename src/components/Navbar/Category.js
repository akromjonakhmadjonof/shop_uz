import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const CustomText = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  align-items: center;
  letter-spacing: -0.01em;
  cursor: pointer;
  padding: 12px 8px 10px 8px;
  display: flex;
  min-width: 200px;
  height: 69px;
  justify-content: space-evenly;
  color: #333;
  //border-top-right-radius: 10px;
  border-bottom: 2px solid transparent;
  transition: 0.2s all ease;
  //border-top-left-radius: 10px;
  margin-bottom: -1px;
  position: relative;

  &.active {
    transition: 0.2s all ease;
    //border-top-right-radius: 10px;
    //border-top-left-radius: 10px;
    background: #EBF2FF !important;
    color: #4F71DC !important;

    &:after {
      content: '';
      position: absolute;
      transition: 0.2s all ease;
      right: 0;
      bottom: -1px;
      width: 100%;
      border-radius: 10px;
      background-color: #4F71DC;
      height: 3px;
    }

    //
    //&:before {
    //  content: '';
    //  position: absolute;
    //  left: 0;
    //  bottom: 0;
    //  width: 0;
    //  height: 0;
    //  border-bottom: 10px solid #2979FF;
    //  border-right: 10px solid transparent;
    //}

    & svg {
      stroke: #2979FF !important;
    }
  }

  flex-direction: column;
`;

function CategoryItem(props) {
	// Hooks
	const history = useHistory();
	const {t} = useTranslation();
	// Props data
	const {
		children, href, icon, currentLocation,
	} = props;
	// Data
	const isActive = (href === currentLocation);
	// Handlers
	const handleRedirect = () => {
		history.push(href);
	};
	// Render
	return (
		// <Tooltip placement={'bottom'} title={t('category') + ' ' + children}>
		<CustomText className={isActive ? 'active' : ''} onClick={() => handleRedirect()}>
			{icon}
			<span style={{paddingTop:'5px'}}>{children}</span>
		</CustomText>
		// </Tooltip>
	);
}

export default CategoryItem;

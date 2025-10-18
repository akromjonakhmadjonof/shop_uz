import React from 'react';
import {Empty as ANTDEmpty} from 'antd';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

// Component
function Empty(props) {
	// Props data
	const {description, image, imageStyle} = props;
	// Hooks
	const {t} = useTranslation();
	// Data
	const checkDescription = description || `${t('no_data')}...`;
	const checkImage = image || ANTDEmpty.PRESENTED_IMAGE_DEFAULT;
	// Render
	return (
		<ANTDEmpty description={checkDescription} image={checkImage} imageStyle={imageStyle}/>
	);
}

Empty.propTypes = {
	imageStyle:PropTypes.object,
	description:PropTypes.string,
	image:PropTypes.any,
};

export default Empty;

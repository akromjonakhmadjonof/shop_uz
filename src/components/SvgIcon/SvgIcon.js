import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled('svg')`
 transition: fill 300ms;
 min-width: 1em;
`;

function SvgIcon({
	classes, className, children, ...props
}) {
	return (
		<Svg
			fill="currentColor"
			{...props}
		>
			{children}
		</Svg>
	);
}

SvgIcon.propTypes = {
	classes:PropTypes.object,
	children:PropTypes.any.isRequired,
	color:PropTypes.string,
	className:PropTypes.string,
	fontSize:PropTypes.string,
	viewBox:PropTypes.string,
};

SvgIcon.defaultProps = {
	fontSize:'24px',
	viewBox:'0 0 24 24',
	height:'1em',
	width:'1em',
	xmlns:'http://www.w3.org/2000/svg',
};

export default SvgIcon;

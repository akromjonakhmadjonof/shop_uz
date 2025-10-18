import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link as RoutingLink} from 'react-router-dom';

const RouterLink = styled(RoutingLink)`
	color: inherit;
	text-decoration: none;
	&:hover {
		color: #4F71DC !important;
	}
  ${({styles}) => styles}
`;

function Link(props) {
	const {children, href, styles} = props;
	return (
		<RouterLink
			styles={styles}
			to={href}
			{...props}
		>
			{children}
		</RouterLink>
	);
}

Link.propTypes = {
	href:PropTypes.string.isRequired,
};

export default Link;

import React from 'react';
import styled from 'styled-components';

const MainContainer = styled('div')`
	width: 100%;
	max-width: 1170px;
	margin: auto;
	@media only screen and (max-width: 1190px) {
    padding: 0 20px;
	}
`;

export default function Container(props) {
	const {children} = props;
	return (
		<MainContainer
			children={children}
			maxWidth="lg"
			{...props}
		/>
	);
}

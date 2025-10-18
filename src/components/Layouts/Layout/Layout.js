import React from 'react';
import styled from 'styled-components';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Document from 'components/Document';
import {useTranslation} from 'react-i18next';

const Container = styled('div')`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Component = styled('div')`
  padding: ${({withoutPadding}) => (withoutPadding ? '0' : '40px 0')};
  width: 100%;
`;

function Layout(props) {
	const {children, without_padding, title} = props;
	const {t} = useTranslation()
	return (
		<Document title={'shop.uz - ' + t(title)}>
			<Container>
				<Navbar/>
				<Component withoutPadding={without_padding}>
					{children}
				</Component>
				<Footer/>
			</Container>
		</Document>
	);
}

export default Layout;

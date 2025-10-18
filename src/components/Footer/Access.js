import React from 'react';
import {Box} from '@mui/material';
import Text from 'components/Text';
import {Facebook, Twitter} from 'react-feather';

export default function Access(props) {
	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			{...props}
		>
			<Text>© 2020 Lochin. All rights reserved.</Text>
			<Text>Политика обработки персональных данных</Text>
			<Box
				width="75px"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Facebook/>
				<Twitter/>
			</Box>
		</Box>
	);
}

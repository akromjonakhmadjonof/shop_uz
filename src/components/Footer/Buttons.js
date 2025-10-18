import React from 'react';
import {Box} from '@mui/material';
import AppStore from 'media/icons/app_store';
import GooglePlay from 'media/icons/google_play';

export default function Buttons(props) {
	return (
		<Box
			display="flex"
			width="30%"
			margin="auto"
			justifyContent="space-between"
			alignItems="center"
			paddingTop="67px"
			paddingBottom="92px"
		>
			<AppStore/>
			<GooglePlay/>
		</Box>
	);
}

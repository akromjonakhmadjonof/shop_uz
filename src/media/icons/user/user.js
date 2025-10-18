import React from 'react';
import SvgIcon from 'components/SvgIcon';

export default function User(props) {
	return (
		<SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
				fill="#333333"
			/>
			<path
				opacity="0.4"
				d="M11.997 12.5837C14.935 12.5837 17.289 10.2287 17.289 7.29169C17.289 4.35469 14.935 1.99969 11.997 1.99969C9.06008 1.99969 6.70508 4.35469 6.70508 7.29169C6.70508 10.2287 9.06008 12.5837 11.997 12.5837Z"
				fill="#69707E"
			/>
		</SvgIcon>
	);
}

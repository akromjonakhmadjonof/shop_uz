import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Mail} from 'react-feather';
import {useHistory} from 'react-router-dom';
import {MESSAGES_URL} from 'location/routes';
import {useTranslation} from 'react-i18next';
import {Tooltip} from 'antd';
import {socket} from '../../../App';
import toCamelCase from '../../../tools/toCamelCase';
import _ from 'lodash';
import useAudio from 'hooks/useAudio';
import notificationSound from 'media/music/notificationSound.mp3';

// Style
const Button = styled('div')`
  width: auto;
  position: relative;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({theme}) => theme.color.dark.dark_grey};

  & svg {
    color: ${({theme}) => theme.color.dark.dark_grey};
  }

  & > :first-child {
    margin-right: 7px;
  }
`;

const Length = styled('div')`
  width: 30px;
  height: 20px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.background.light.action};
  display: flex;
  align-items: center;
  top: -15px;
  justify-content: center;
  position: absolute;
  color: #fff;
  right: -25px;
`;

// Component
function MailButton(props) {
	// Hooks
	const history = useHistory();
	const {t} = useTranslation();

	const [playing, toggle] = useAudio(notificationSound)
	const [count, setCount] = useState([]);

	useEffect(() => {
		socket.emit('get_message_notifications');
	}, []);

	useEffect(() => {
		socket.on('give_message_notifications', (data) => {
			setCount(toCamelCase(data));
		});
		socket.on('new_message_notification', () => {
			toggle()
		})
		socket.on('message_notifications_updated', () => {
			socket.emit('get_message_notifications');
		});
	}, [socket]);
	const notificationSize = _.size(count)

	// Handlers
	const handleClick = () => {
		history.push(MESSAGES_URL);
	};
	// Render
	return (
		<Tooltip placement="bottom" title={t('navbar_message')}>
			<Button onClick={handleClick} {...props}>
				<div>
					<Mail width="22" height="22"/>
				</div>
				<div>{t('navbar_message')}</div>
				{notificationSize ? <Length>
					{notificationSize > 8 ? '9+' : notificationSize}
				</Length> : null}
			</Button>
		</Tooltip>
	);
}

export default MailButton;

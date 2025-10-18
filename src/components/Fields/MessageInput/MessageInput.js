import Picker from 'emoji-picker-react';
import {Smile} from 'react-feather';
import TextField from 'components/Fields/TextField';
import Send from 'media/icons/send/send';
import React from 'react';
import styled from 'styled-components';

const Label = styled('label')`
  width: 100%;
  height: 100%;
  position: relative;

  & > .das {
    min-width: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    max-width: 40px;
  }

  & > :nth-child(1) {
    width: 90% !important;
    height: 60px !important;
    margin-left: 20px;
    & p {
      display: none;
    }

    & > label {
      border: none !important;
      height: 60px !important;
    }
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SendIcon = styled('div')`
  display: block;
  cursor: pointer;
`;

const Emojis = styled('div')`
  width: auto;
  height: auto;
  padding: 10px;
  position: absolute;
  bottom: 60px;
  display: ${({open}) => open ? 'block' : 'none'};
  z-index: 100;
  left: 0;
`;


const MessageInput = (props) => {
	const {handlePostMessage, message, handleTyping, handleStopTyping, t, reply} = props;
	return (
		<>
			{/*<Emojis open={open}>*/}
			{/*	<Picker onEmojiClick={(e, emoji) => input.onChange(message + emoji.emoji)}/>*/}
			{/*</Emojis>*/}
			<Label>
				{/*<Smile onClick={() => {*/}
				{/*	setOpen(!open);*/}
				{/*}} size={22}/>*/}
				<TextField
					onKeyPress={handleTyping}
					padding={'18px 18px 18px 0'}
					onKeyDown={handleStopTyping}
					placeholder={`${t('write_message')} . . .`}
					{...props}
				/>
				<SendIcon onClick={(e) => message && handlePostMessage(e, message)}>
					<Send/>
				</SendIcon>
			</Label>
		</>
	);
};

export default MessageInput;

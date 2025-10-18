import React, {useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import {Field} from 'redux-form';
import ScrollToBottom from 'react-scroll-to-bottom';
import FormattedMessages from './FormattedMessages';
import TypingLoader from 'components/Loader/TypingLoader';
import MessageInput from 'components/Fields/MessageInput';
import MoreDialog from 'components/Chat/Dialogs/MoreDialog';
import {Menu, X} from 'react-feather';
import Loader from 'components/Loader';
import sprintf from 'sprintf';
import timeFormat from 'tools/timeFormat';
import Info from 'components/Chat/Info';

const ChatItem = styled('div')`
  padding: 10px;
  height: 80px;
  background: ${({theme}) => theme.background.primary};
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
  width: 100%;
`;

const Header = styled(ChatItem)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const ChatRow = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled('button')`
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
  border: none;
  height: 100%;
  outline: none;
  background: initial;
`;

const Img = styled('div')`
  border-radius: 50%;
  overflow: hidden;
  height: 45px;
  width: 45px;

  & img {
    height: 45px;
    width: 45px;
  }
`;

const About = styled('div')`
  margin-left: 15px;
  width: auto;

  & h5, p {
    margin-bottom: 0;
  }
`;

const ChatWrapper = styled('div')`
  background: rgba(255, 255, 255, 0.49);
  height: 800px;
  width: 100%;
  position: relative;
`;

const Name = styled('p')`
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-family: var(--semi-bold);
  font-size: 15px;
  line-height: 145%;
  /* identical to box height, or 22px */
  mix-blend-mode: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;

  color: #333333;
`;

const Content = styled('div')`
  height: 100%;
  padding-bottom: ${({reply}) => reply ? '120px' : '60px'};
  padding-top: 80px;
  display: flex;
  align-items: flex-end;

  & .message-container {
    width: 100%;
    height: 100%;
    overflow-y: ${({loading}) => loading ? 'hidden' : 'scroll'};
    overflow-x: hidden;

    & > button {
      display: none;
    }

    & > div {
      &::-webkit-scrollbar {
        width: 4px;
      }
    }
  }
`;

const Label = styled('label')`
  width: 100%;
  position: absolute;
  bottom: 60px;
  padding: 18px;
  background: #F9F9F9;
  border-top: 1px solid #DFE0E3;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastSeen = styled('p')`
  padding-top: 6px;
`;

const Area = styled('form')`
  padding: 10px;
  height: 60px;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  background: ${({theme}) => theme.background.primary};
  border-top: 1px solid ${({theme}) => theme.border.color.primary};
  width: 100%;
`;

const Loading = styled('div')`
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Component
function SelectedChat(props) {
	// Props data
	const {handleDeleteMessage, values, handlePostMessage, handleTyping, data, chat, authData, typing, loading} = props;

	const [infoOpen, setInfoOpen] = useState(false)

	const chatData = _.get(chat, ['data']);

	// Data
	const message = _.get(values, ['message']);
	const image = _.get(chatData, ['user', 'image', 'src']);
	const isTyping = _.get(typing, ['typing']);
	const typingUser = _.get(typing, ['userName']);
	const fullName = _.get(chatData, ['target', 'fullName']);
	const target = _.get(chatData, ['target']);
	const targetImage = _.get(target, ['image', 'src']);
	const targetId = _.get(target, ['userId'])
	const userId = _.get(authData, ['userId']);
	const lastSeen = _.get(chatData, ['lastSeen']);
	const targetName = _.get(target, ['login', 'userName'])
	// Hooks
	const [open, setOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState({
		open:false,
		id:null,
		author:null
	});
	const {t} = useTranslation();
	const [reply, setReply] = useState();
	// Render
	return (
		<>
			<MoreDialog
				message={modalOpen.id}
				handleDeleteMessage={handleDeleteMessage}
				author={modalOpen.author}
				open={modalOpen.open}
				setOpen={setModalOpen}
			/>
			<ChatWrapper>
				<Header>
					<ChatRow>
						<Img>
							<img
								src={targetImage}
								alt="user"
							/>
						</Img>
						<About>
							<Name style={{marginTop:0}}>{fullName}</Name>
							{isTyping ? <TypingLoader suffix={typingUser}/> :
								<LastSeen>{sprintf(t('last_seen_chat'), timeFormat(lastSeen))}</LastSeen>}
						</About>
					</ChatRow>
					<Button onClick={() => setInfoOpen(true)}>
						<Menu/>
					</Button>
				</Header>
				<Content
					loading={loading}
					reply={reply}
				>
					<ScrollToBottom
						className={'message-container'}>
						{
							loading ?
								<Loading>
									<Loader />
								</Loading>
								:
								<FormattedMessages
									data={data}
									setReply={setReply}
									image={image}
									targetId={targetId}
									setOpen={setModalOpen}
									targetImage={targetImage}
									userId={userId}
								/>
						}
					</ScrollToBottom>
				</Content>
				{!_.isEmpty(reply)
					? <Label>
						<span>
							{_.get(reply, ['message'])}
						</span>
						<X onClick={() => setReply({})} cursor={'pointer'}/>
					</Label>
					: null
				}
				<Area onSubmit={(e) => handlePostMessage(e, message, _.get(reply, ['messageId']))}>
					<input type="submit" hidden/>
					<Field
						component={MessageInput}
						setOpen={setOpen}
						message={message || ''}
						t={t}
						open={open}
						reply={reply}
						name={'message'}
						handlePostMessage={handlePostMessage} handleTyping={handleTyping}
					/>
				</Area>
				{infoOpen && <Info
					isOpen={infoOpen}
					targetName={targetName}
					targetImage={targetImage}
					setOpen={setInfoOpen}
					fullName={fullName}
				/>}
			</ChatWrapper>
		</>
	);
}

export default SelectedChat;

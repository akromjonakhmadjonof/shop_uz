import React from 'react';
import styled from 'styled-components';
import {Col, Row} from 'react-bootstrap';
import _ from 'lodash';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import sprintf from 'sprintf';
import {MESSAGE_DETAIL_URl} from 'location/routes';
import {useTranslation} from 'react-i18next';
import SelectedChat from './Chat';
import FormattedChats from './FormattedChats';
import {appendParamsToUrl} from 'tools/url';
import {socket} from '../../../App';

// Style
const Wrapper = styled('div')`
  width: 100%;
  height: 800px;
  border-left: 1px solid ${({theme}) => theme.border.color.primary};
  border-right: 1px solid ${({theme}) => theme.border.color.primary};
  background: ${({theme}) => theme.background.primary};

  & .row {
    width: 100%;
  }
`;

const Background = styled('div')`
  width: 100%;
  background: #ffffff;
  margin-bottom: ${({marginBottom, mb}) => marginBottom || mb || '0'};
`;

const Chats = styled(Col)`
  height: 800px;
  border-right: 1px solid ${({theme}) => theme.border.color.primary};
`;

const ChatWrapper = styled('div')`
  background: rgba(255, 255, 255, 0.49);
  height: 800px;
  width: 100%;
  position: relative;
`;

const SelectChat = styled('div')`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border-radius: 20px;
  background: rgba(180, 180, 180, 0.09);
  box-shadow: 0 2px 4px rgb(27 78 163 / 9%), 0 4px 8px rgb(41 121 255 / 5%);

`;

const style = {
	display:'flex',
	alignItems:'center',
	justifyContent:'center',
};

const Container = styled('div')`
  width: 100%;
  max-width: 1170px;
  margin: auto;
`;

// Component
function Messages(props) {
	// Props data
	const {
		authData,
		chat,
		typing,
		handlePostMessage,
		handleSetChat,
		data,
		handleTyping,
		handleSeen,
		handleDeleteMessage,
		chats,
		formValues
	} = props;
	// Hooks
	const history = useHistory();
	const {chatId} = useParams();
	const location = useLocation();
	const {t} = useTranslation();

	// Data
	const chatsList = _.get(chats, ['data'])
	const chatsLoading = _.get(chats, ['loading'])
	const search = _.get(location, ['search']);
	const selectedChatId = chatId;
	// Functions
	const handleClick = (id) => {
		handleSeen()
		socket.emit('remove_un_reads', chatId)
		history.push({pathname:sprintf(MESSAGE_DETAIL_URl, id), search:appendParamsToUrl({}, search)});
	};
	//
	const selectChat = (
		<ChatWrapper style={style}>
			<SelectChat>
				{t('select_chat')}
			</SelectChat>
		</ChatWrapper>
	);
	// Render
	return (
		<Background {...props}>
			<Container>
				<Wrapper className="desktop">
					<Row>
						<Chats xs={3}>
							<FormattedChats
								handleClick={handleClick}
								handleSetChat={handleSetChat}
								chats={chatsList}
								selectedChatId={selectedChatId}
								loading={chatsLoading ? 1 : 0}
							/>
						</Chats>
						<Col xs={9}>
							{!_.isUndefined(selectedChatId) ? <SelectedChat
								values={formValues}
								data={_.get(data, ['data'])}
								loading={_.get(data, ['loading'])}
								typing={typing}
								authData={authData}
								chat={chat}
								handleDeleteMessage={handleDeleteMessage}
								handleTyping={handleTyping}
								handlePostMessage={handlePostMessage}
							/> : selectChat}
						</Col>
					</Row>
				</Wrapper>
			</Container>
		</Background>
	);
}

export default Messages;

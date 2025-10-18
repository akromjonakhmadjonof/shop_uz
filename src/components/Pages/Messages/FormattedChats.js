import React from 'react';
import {Field} from 'redux-form';
import DebounceSearch from 'components/Fields/DebounceSearch';
import _ from 'lodash';
import Empty from 'components/Empty';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import PureLoader from 'components/Loader/PureLoader';
import toNumber from 'tools/toNumber';
import timeFormat from '../../../tools/timeFormat';

const Column = styled('div')`
  width: 100%;
  height: 92%;
  cursor: pointer;
  overflow: hidden scroll;
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Chat = styled('div')`
  position: relative;
  display: flex;
  padding: 10px 10px 15px;
  align-items: flex-end;
  height: 80px;

  background: ${({theme, active}) => !active ? theme.background.primary : '#fff !important'};
  border-top: 1px solid ${({theme, active}) => active ? theme.border.color.primary : 'inherit'};
  border-bottom: 1px solid ${({theme, active}) => active ? theme.border.color.primary : 'inherit'};
  width: 100%;
`;

const Img = styled('div')`
  border-radius: 50%;
  height: 45px;
  width: 45px;

  & img {
    height: 45px;
    border-radius: 50%;
    width: 45px;
  }
`;

const ChatRow = styled('div')`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const About = styled('div')`
  position: relative;
  margin-left: 15px;
  width: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  & h5, p {
    margin-bottom: 0;
  }
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

const LastMessage = styled('p')`
  font-weight: ${({theme}) => theme.card.description.font.weight};
  font-size: 16px;
  line-height: ${({theme}) => theme.card.description.font.height};
  letter-spacing: ${({theme}) => theme.card.description.font.spacing};
  color: ${({theme}) => theme.card.description.font.color};
  mix-blend-mode: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  text-overflow: ellipsis;
`;

const Length = styled('div')`
  min-width: 22px;
  max-width: 22px;
  height: 22px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.background.light.action};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  font-size: 13px;
  top: 15px;
  right: 23px;
}

`;

const Loader = styled(Column)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Time = styled('p')`
  position: absolute;
  right: 10px;
  bottom: 0;
`;

// Component
const FormattedChats = (props) => {
	// Props data
	const {chats, handleSetChat, handleClick, loading, selectedChatId} = props;
	// Hooks
	const {t} = useTranslation();
	// Render
	return (
		<>
			<Field
				component={DebounceSearch}
				name={'chatsSearch'}
				placeholder={`${t('search')} . . .`}
			/>
			{
				loading ? <Loader>
					<PureLoader/>
				</Loader> : null
			}
			{!loading ? <Column>
				{!_.isEmpty(chats) &&
					_.map(chats, (item, key) => {
						const id = _.toNumber(_.get(item, ['chatId']));
						const target = _.get(item, ['target']);
						const fullName = _.get(target, ['fullName']);
						const lastMessage = _.get(item, ['lastMessage']);
						const lastActivity = _.get(item, ['lastActivity']);
						const unReadsCount = _.get(item, ['unReadsCount']);
						const image = _.get(target, ['image', 'src']);
						const userName = _.get(item, ['userName']);
						return (
							<Chat active={toNumber(selectedChatId) === toNumber(id)}
								  onClick={() => (handleSetChat ? handleSetChat(id) : handleClick(id))} key={key}>
								<ChatRow>
									<Img>
										<img
											src={image}
											alt={userName}
										/>
									</Img>
									<About>
										<Name>{fullName}</Name>
										<LastMessage>{lastMessage}</LastMessage>
									</About>
								</ChatRow>

								<Time>
									{timeFormat(lastActivity)}
								</Time>
								{unReadsCount ? (
									<Length>
										{unReadsCount}
									</Length>
								) : null}
							</Chat>
						);
					})
				}
				{
					_.isEmpty(chats) && <Empty description={t('no_chats') + ' . . .'}/>
				}
			</Column> : null}
		</>
	);
};

export default FormattedChats;

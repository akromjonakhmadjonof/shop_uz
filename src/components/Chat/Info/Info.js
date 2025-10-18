import React from 'react';
import styled from 'styled-components';
import {X} from 'react-feather';
import {Field} from 'redux-form';
import Checkbox from 'components/Fields/Checkbox';
import {useTranslation} from 'react-i18next';
import useMessenger from 'hooks/useMessenger';
import useHistoryObj from 'hooks/useHistoryObj';
import {MESSAGES_URL} from 'location/routes';

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

const Wrapper = styled('div')`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #FAFAFA;
`;

const Name = styled('p')`
  width: 100%;
  margin: 0 !important;
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
  text-overflow: ellipsis;
  letter-spacing: -0.01em;

  color: #333333;
`;

const About = styled('div')`
  margin-left: 15px;
  width: 100%;
  &  p {
    margin-bottom: 0;
  }
  &.header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
	font-size: 18px;
	font-weight: 600;
  }
`;

const ChatRow = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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

const LastSeen = styled('p')`
  padding-top: 6px;
`;

const Content = styled('div')`
  height: 100%;
`;

const FieldWrap = styled('div')`
  width: 100%;
  padding: ${({first}) => first ? '106px 30px 26px 30px' : '10px 30px 10px 30px'};
  border-bottom: 1px solid ${({theme}) => theme.border.color.primary};
`;

const Chat = styled('div')`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 80px;
  cursor: pointer;
  width: 100%;
`;

const Item = styled('div')`
  cursor: pointer;
  padding: 10px 0;
  width: 100%;

  & p {
    margin: 0;
  }

  color: ${({theme}) => theme.background.light.action};
`;

const List = styled('div')`
`;

const Info = (props) => {
	const {setOpen, fullName, targetImage, targetName} = props;
	const {deleteChat} = useMessenger();
	const {t} = useTranslation();
	const {push} = useHistoryObj();
	return (
		<Wrapper>
			<Header>
				<About className={'header'}>
					<p>{t('information')}</p>
				</About>
				<Button onClick={() => setOpen(false)}>
					<X/>
				</Button>
			</Header>
			<Content>
				<FieldWrap first>
					<Field
						name={'disable'}
						component={Checkbox}
						label={t('disable_notifications')}
					/>
				</FieldWrap>
				<FieldWrap>
					<Name>{t('members')}</Name>
					<List>
						<Chat>
							<ChatRow>
								<Img>
									<img
										src={targetImage}
										alt="user"
									/>
								</Img>
								<About>
									<Name>{fullName}</Name>
									<LastSeen>
										{targetName}
									</LastSeen>
								</About>
							</ChatRow>
						</Chat>
					</List>
				</FieldWrap>
				<FieldWrap>
					<List>
						<Item onClick={() => deleteChat(
							push({
								pathname: MESSAGES_URL
							})
						)}>
							<p>{t('delete_chat')}</p>
						</Item>
						<Item>
							<p>{t('block')}</p>
						</Item>
						<Item>
							<p>{t('complain')}</p>
						</Item>
					</List>
				</FieldWrap>
			</Content>
		</Wrapper>
	);
};

export default Info;

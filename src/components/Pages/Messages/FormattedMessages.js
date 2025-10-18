import React from 'react';
import {ChevronDown, CornerUpLeft, CornerUpRight} from 'react-feather';
import _ from 'lodash';
import {useScrollToBottom, useSticky} from 'react-scroll-to-bottom';
import styled from 'styled-components';
import timeFormat from 'tools/timeFormat';
import {Title} from '../../Title';
import {useTranslation} from 'react-i18next';
import sprintf from 'sprintf';

const To = styled('div')`
  position: relative;
  width: auto;
  background: #4B589F82;
  padding: 10px 15px;
  border-radius: 11px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  color: #ffffff;
  margin-right: 10px;
  padding-right: 40px !important;
  min-width: 100px;
  max-width: 45%;

  &:hover {
    & .more {
      transition: 0.1s;
      opacity: 1;
    }
  }
`;

const From = styled('div')`
  max-width: 45%;
  flex-wrap: wrap;
  width: auto;
  min-width: 100px;
  background: #4b589f;
  padding: 10px 15px;
  border-radius: 11px;
  color: #ffffff;
  margin-left: 10px;
  position: relative;
  padding-right: 40px !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);

  &:hover {
    & .more {
      transition: 0.1s;
      opacity: 1;
    }
  }
`;

const FromRow = styled('div')`
  margin: 10px 0 10px 15px;
  padding-left: ${({disabled}) => disabled ? '45px' : '0'};
  & > :first-child {
	background: ${({disabled}) => disabled ? '#545D7A' : 'inherit'};
  }
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ToRow = styled('div')`
  margin: 10px 15px 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

const ToBottom = styled('div')`
  position: absolute;
  bottom: 10px;
  z-index: 1000;
  cursor: pointer;
  min-width: 40px !important;
  min-height: 40px !important;
  max-height: 40px !important;
  max-width: 40px !important;
  text-transform: inherit !important;
  padding: 1px 1px 0 0 !important;
  border: 1px solid #939090FF;
  transition: 0.5s all ease;
  opacity: .5;

  &:hover {
    opacity: 1;
    transition: 0.5s all ease;
  }

  background-color: #939090FF !important;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  border-radius: 50%;
`;

const Img = styled('div')`
  border-radius: 50%;
  height: 45px;
  overflow: hidden;
  width: 45px;

  & img {
    height: 45px;
    width: 45px;
  }
`;

const FromTime = styled('div')`
  position: absolute;
  right: 8px;
  bottom: 2px;
  font-size: 11px;
`;

const ToTime = styled('div')`
  position: absolute;
  right: 8px;
  bottom: 2px;
  font-size: 11px;
`;

const FromMore = styled('div')`
  position: absolute;
  right: -45px;
  top: 20%;
  cursor: pointer;

  & > * {
    margin-left: 10px;
  }

  transition: .1s;
  opacity: 0;
`;

const ToMore = styled('div')`
  & > * {
    margin-right: 10px;
  }

  position: absolute;
  left: -45px;
  top: 20%;
  cursor: pointer;
  opacity: 0;
  transition: 0.1s;
`;

const Welcome = styled('div')`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomeContent = styled('div')`
  border: 1px solid #e1e1e1;
  background: #fafafa;
  width: 410px;
  border-radius: 14px;
  padding: 20px;

  & > :not(:last-child) {
    margin-bottom: 20px !important;
  }
`;

const Rules = styled('ul')`
  width: 90%;
  margin-left: 30px;

  list-style: initial !important;


  & > li {

    font-size: 16px;
  }

  & > :not(:last-child) {
    margin-bottom: 10px !important;
  }

`;

const FormattedMessages = (props) => {
	// Props data
	const {data, userId, image, targetImage, setReply, targetId} = props;
	// Hooks
	const scrollToBottom = useScrollToBottom();
	const [sticky] = useSticky();
	const {t} = useTranslation();
	return (
		<>
			<Welcome>
				<span>
					<Title styles={{'fontSize':'20px', 'marginBottom':'10px'}}>{t('welcome')}</Title>
					<WelcomeContent>
						<Title styles={{'fontSize':'18px', 'marginBottom':'10px'}}>{t('rules')}:</Title>
						<Rules>
							<li>{t('dont_insulting_words')}</li>
							<li>{t('ideological_messages')}</li>
						</Rules>
						<Title styles={{'fontSize':'18px', 'marginBottom':'10px'}}>{t('note')}:</Title>
						<Rules>
							<li>{t('media_dont_send')}</li>
							<li>{sprintf(t('contact_admin'), 'ADMIN')}</li>
							<li>{t('secure_messenger')}</li>
						</Rules>
					</WelcomeContent>
				</span>
			</Welcome>
			{!sticky &&
				<ToBottom onClick={scrollToBottom}>
					<ChevronDown stroke={'#fff'}/>
				</ToBottom>
			}
			{
				_.map(data, (item, key) => {
					const message = _.get(item, ['message']);
					const author = _.get(item, ['author']);
					const entryTime = _.get(item, ['entryTime']);
					const reply = _.get(item, ['reply', 'message']);
					if (author === userId) {
						return (
							<>
								<ToRow key={key}>
									<To>
										<ToTime>
											{timeFormat(entryTime)}
										</ToTime>
										{message}
										<ToMore className={'more'} onClick={() => setReply(item)}>
											<CornerUpRight stroke={'#666'}/>
										</ToMore>
									</To>
									<Img>
										<img
											src={image}
											alt="user"
										/>
									</Img>
								</ToRow>
							</>
						);
					} else if (author === targetId) {
						return (
							<>
								<FromRow key={key}>
									<Img>
										<img
											src={targetImage}
											alt="user"
										/>
									</Img>
									<From>
										{message}
										<FromTime>
											{timeFormat(entryTime)}
										</FromTime>
										<FromMore className={'more'} onClick={() => setReply(item)}>
											<CornerUpLeft stroke={'#666'}/>
										</FromMore>
									</From>
								</FromRow>
							</>
						);
					}
					return (
						<>

						</>
					);
				})
			}
		</>
	);
};

export default FormattedMessages;

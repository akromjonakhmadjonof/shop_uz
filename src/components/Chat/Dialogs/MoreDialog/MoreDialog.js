import {Modal} from 'antd';
import {useTranslation} from 'react-i18next';
import {AlertOctagon, ArrowLeft, Heart, Trash2, X} from 'react-feather';
import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';

// Styles
const Header = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled('h1')`
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #333333;
`;

const Icon = styled('div')`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Wrapper = styled('div')`
  width: 100%;

  & > .emoji-picker-react {
    width: 100%;
    box-shadow: none;
  }

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Item = styled('div')`
  width: 100%;
  height: 50px;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span {
    height: 100%;
  }

  & > :first-child {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e1e1e1;
  }

  & > :last-child {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  &:hover > :first-child {
    background: ${({color}) => color};

    & > svg {
      stroke: #ffffff;
    }
  }

  &:active {
    background: ${({theme}) => theme.background.active};
  }
`;

const MoreDialog = (props) => {
	const {open, setOpen, author, handleDeleteMessage, message} = props;

	// Style Object
	const okButtonStyles = {
		display:'none'
	};

	// Hooks
	const {t} = useTranslation();
	const [like, setLike] = useState(false);

	// Handlers
	const handleClose = () => {
		setOpen({
			open:false,
			id:null,
			author:null
		});
	};

	// Data
	const header = (
		<Header>
			<Title>
				{like ? t('like_it') : t('actions_with_message')}
			</Title>
			<Icon onClick={like ? () => setLike(false) : handleClose}>

				{
					like ?
						<ArrowLeft size={18}/>
						: <X size={18}/>
				}
			</Icon>
		</Header>
	);
	return (
		<Modal
			visible={open}
			title={header}
			closable={false}
			bodyStyle={{padding:'0'}}
			width={'350px'}
			footer={false}
			okButtonProps={{style:okButtonStyles}}
			cancelButtonProps={{style:okButtonStyles}}
			destroyOnClose={handleClose}
		>
			{
				!like && <Wrapper>
					<Item color={'#F61B58'} onClick={setLike.bind(true)}>
					<span>
						<Heart/>
					</span>
						<span>
						{t('like_message')}
					</span>
					</Item>
					<Item color={'#FBB751'}>
					<span>
						<AlertOctagon/>
					</span>
						<span>
						{t('spam_message')}
					</span>
					</Item>
					{author && <Item color={'#F61B58'} onClick={() => handleDeleteMessage(message)}>
					<span>
						<Trash2/>
					</span>
						<span>
						{t('delete_selected_message')}
					</span>
					</Item>}
				</Wrapper>
			}
			{
				like &&
				<Wrapper>
					<Picker onEmojiClick={(e, emoji) => console.log(e, emoji)}/>
				</Wrapper>
			}
		</Modal>
	);
};

export default MoreDialog;

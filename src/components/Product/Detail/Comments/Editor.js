import React from 'react';
import {Field} from 'redux-form';
import TextField from 'components/Fields/TextField';
import styled from 'styled-components';
import {Button, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import sprintf from 'sprintf';
import user from 'media/images/user.png';
import CommentItem from 'components/Pages/Comments/CommentItem';
import _ from 'lodash';
import {Text} from 'components/Fields/TextField/TextField';
import {compose} from 'recompose';
import {connect} from 'react-redux';

const Wrapper = styled('form')`
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 10px;
`;

const Box = styled('div')`
  width: 100%;
`;

const Img = styled('div')`
  border-radius: 50%;
  overflow: hidden;
  height: 45px;
  margin-top: 10px;
  margin-right: 20px;
  border: ${({isUnknown}) => !isUnknown ? '1px solid #e1e1e1' : 'solid 1px white'};
  width: 45px;

  & img {
    width: ${({isUnknown}) => !isUnknown ? '100%' : '45px'};
    height: ${({isUnknown}) => !isUnknown ? '100%' : '45px'};
  }
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  height: 45px;
  width: 300px;
`;

const CustomRow = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 30px;
`;

const ReplyWrapper = styled('div')`
  width: 94.3%;
  margin-bottom: -25px;
  margin-left: auto;
  background: #00000024;
  border-radius: 14px 14px 0 0;
  padding: 0 20px;
`;

const enhance = compose(
	connect((state) => {
		const image = _.get(state, ['auth', 'data', 'image', 'src']);
		const name = _.get(state, ['auth', 'data', 'fullName']);
		const authId = _.get(state, ['auth', 'data', 'id'])
		return {
			image,
			authId,
			name
		}
	})
);

const Editor = (props) => {
	const {image, name, onSubmit, replyData, authId} = props;
	const {t} = useTranslation();
	return (
		<>
			{!_.isEmpty(replyData) && <Text style={{width:'94.3%', marginLeft:'auto'}}>
				{t('reply_to') + ' ' + _.get(replyData, ['author', 'fullName'])}
			</Text>}
			{!_.isEmpty(replyData) &&
				<ReplyWrapper>
					<CommentItem data={replyData} isReply
								 authId={authId}/>
				</ReplyWrapper>
			}

			<Wrapper onSubmit={onSubmit}>
				<Img isUnknown={image}>
					<img
						src={image || user}
						alt="user"
					/>
				</Img>
				<Box>
					<Field
						placeholder={`${t('enter_comment')} . . .`}
						name="comment"
						label={_.isEmpty(replyData) ? t('comment') + ' ' + sprintf(t('as'), name) : null}
						component={TextField}
						textarea
						fullWidth
						borderRadius={!_.isEmpty(replyData) ? '0 0 14px 14px' : '14px'}
					/>
					<CustomRow>
						<StyledButton variant="success" type={'submit'}>{t('add_comment')}</StyledButton>
					</CustomRow>
				</Box>
			</Wrapper>
		</>
	);
}

export default enhance(Editor)


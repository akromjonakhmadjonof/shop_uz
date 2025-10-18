import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import sprintf from 'sprintf';
import {PRODUCT_DETAIL_URL, USER_DETAILS_URL} from '../../location/routes';
import {useHistory} from 'react-router-dom';

const Wrapper = styled('div')`
  width: 300px;
  box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};
  height: 310px;
  margin-left: 55px;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled('div')`
  width: 300px;
  height: 270px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled('div')`
  & p {
    cursor: pointer;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-bottom: 0;
    text-transform: capitalize;
    overflow: hidden;
    -webkit-line-clamp: 1;
    padding: 0 10px;
    font-size: 16px;
    text-overflow: ellipsis;
  }
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Comment = styled('div')`
  border: 1px solid #e1e1e1;
  background: #fafafa;
  border-radius: 0 14px 14px 14px;
  margin-top: 10px;
  box-shadow: ${({theme, loading}) => !loading && theme.box_shadow.primary};
  min-height: 40px;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  width: 300px;
  & > :first-child {
	font-weight: 600;
	color: #333 !important;
	font-size: 16px;
    margin-bottom: 4px;
  }
`;

const Img = styled('div')`
  border-radius: 50%;
  overflow: hidden;
  height: 45px;
  margin-top: -20px;
  margin-right: 10px;
  border: ${({isUnknown}) => !isUnknown ? '1px solid #e1e1e1' : 'solid 1px white'};
  width: 45px;

  & img {
    width: ${({isUnknown}) => !isUnknown ? '100%' : '45px'};
    height: ${({isUnknown}) => !isUnknown ? '100%' : '45px'};
  }
`;

const Content = styled('div')`
	display: flex;
	align-items: flex-start;
`

const CommentCard = (props) => {
	const {data} = props;
	const img = _.get(data, ['product', 'images', '0', 'src']);
	const product = _.get(data, ['product', 'product', 'name']);
	const productId = _.toInteger(_.get(data, ['product', 'id']));
	const message = _.get(data, ['message']);
	const fullName = _.get(data, ['author', 'fullName']);
	const userId = _.toInteger(_.get(data, ['author', 'userId']));
	const userImage = _.get(data, ['author', 'image', 'src']);
	const history = useHistory()
	const parent = _.get(data, ['parent', 'label'])
	const handleRedirect = () => {
		history.push({
			pathname: sprintf(PRODUCT_DETAIL_URL, parent, userId, productId)
		})
	}
	return (
		<>
			<Wrapper onClick={handleRedirect}>
				<Image>
					<img src={img} alt=""/>
				</Image>
				<Name>
					<p>{product}</p>
				</Name>
			</Wrapper>
			<Content>
				<Img>
					<img src={userImage} alt="user"/>
				</Img>
				<Comment>
					<a href={sprintf(USER_DETAILS_URL, userId)} target={'_blank'}>{fullName}</a>
					<span>{message}</span>
				</Comment>
			</Content>
		</>
	);
};

export default CommentCard;

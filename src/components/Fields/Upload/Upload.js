import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {Trash2} from 'react-feather';
import {useFileUpload} from 'use-file-upload';
import _ from 'lodash';
import {Tooltip} from 'antd';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import axios from 'tools/axios';
import * as API from 'constants/api';
import {openSnackbarAction} from 'actions/snackbar';
import sprintf from 'sprintf';

const enhance = compose(
	connect((state) => {
		const form = _.get(state, ['form']);
		return {
			form,
		};
	}),
);

// Styles
const Wrapper = styled('div')`
  & > input[type='file'] {
    display: none;
  }
`;

const Label = styled('label')`
  min-width: 125px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  & img {
    width: 100%;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({padding}) => (!padding ? '' : 'rgba(66, 69, 168, 0.25)')};
  }

  & > svg {
    height: 20px;
    margin-right: 4px;
    margin-bottom: 10px;
  }

  border-radius: 4px;
  font-weight: 600;
  color: #4245A8;
  font-size: 15px !important;
  padding: ${({padding}) => (padding ? '10px 12px' : '0')};
  border: 2px dotted ${({padding}) => (padding ? '#4245A8' : '#3333336C')};
  width: 100px;
  height: 125px;
  flex-direction: column;

`;

const Content = styled('div')`
  position: absolute;
  top: 0;
  opacity: 0;
  transition: .3s all ease;

  &:hover {
    opacity: 1;
    transition: .3s all ease;
  }

  width: 100%;
  height: 100%;
  left: 0;
  background-color: #333333A5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled('div')`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
`;

// Component
function Upload(props) {
	// Props data
	const {
		input, dispatch, form, formName,
	} = props;

	// Data
	const {
		onChange,
		name,
	} = input;
	// Hooks

	const {t} = useTranslation();

	const [file, setFile] = useFileUpload();

	const source = _.get(form, [formName || 'ProductCreateForm', 'values', name, 'src']);
	const fileName = _.get(form, [formName || 'ProductCreateForm', 'values', name, 'fileName']);

	// Handler
	const handleChange = () => {
		setFile({accept:'image/*'}, (data) => {
			const formData = new FormData();
			formData.append('image', data.file);
			onChange(formData);
			axios().post(API.IMAGE_UPLOAD, formData).then((res) => {
				dispatch(change(formName || 'ProductCreateForm', name, {
					...data,
					src:res.data.src,
					fileName:res.data.file_name
				}));
				openSnackbarAction({
					message:t('successful_uploaded'),
				});
			}).catch((error) => Promise.reject(_.get(error, ['response', 'data'])));
		});
	};
	const handleDelete = () => {
		axios().delete(sprintf(API.IMAGE_DELETE, fileName)).then(() => {
			dispatch(change(formName || 'ProductCreateForm', name, null));
		});
	};
	// Render
	return (
		<Wrapper>
			{_.isUndefined(source)
				&& (
					<Label onClick={handleChange} padding>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="upload"
							className="svg-inline--fa fa-upload fa-w-16"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
							/>
						</svg>
						<span>{t('upload')}</span>
					</Label>
				)}
			{
				!_.isUndefined(source)
				&& (
					<Tooltip>
						<Label>
							<Content>
								<Icon onClick={handleDelete}>
									<Trash2 size={18}/>
								</Icon>
							</Content>
							<img alt="name" src={source}/>
						</Label>
					</Tooltip>
				)
			}
		</Wrapper>
	);
}

export default enhance(Upload);

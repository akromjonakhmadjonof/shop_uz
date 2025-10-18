import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

// Styles
const Label = styled('label')`
  background: #F9F9F9;
  border: 1px solid #DFE0E3;
  width: 100%;
  box-sizing: border-box;
  height: ${({textarea}) => (textarea ? '110px' : '55px')};
  min-height: 60px;
  border-radius: ${({borderRadius}) => borderRadius || '14px'};
  overflow: hidden;
`;

const Input = styled('input')`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background: inherit;
  font-size: 16px !important;
  transition: all 0.2s ease-in-out 0s;
  appearance: none !important;
  visibility: visible;
  padding: ${({padding}) => padding || '18px'};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #00000000 inset !important;
    background: #00000000 !important;
  }
`;

export const Text = styled('p')`
  width: auto;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 5px;
  margin-left: 8px;
  font-size: 17px;
  line-height: 19px;
  cursor: text;
  color: ${({theme}) => theme.color.dark.dark_grey};
`;

const Wrapper = styled('div')`
  width: ${({fullWidth, width}) => width || fullWidth && '100%'};
`;

const Textarea = styled('textarea')`
  border: none;
  outline: none;
  width: 100%;
  background: inherit;
  padding: ${({padding}) => padding || '18px'};
  font-size: 16px !important;
  transition: all 0.2s ease-in-out 0s;
  appearance: none !important;
  visibility: visible;
  height: ${({height}) => height || '200px'};
`;

// Component
function TextField(props) {
	const {
		type = 'text',
		value,
		onKeyPress,
		input,
		styles,
		label,
		padding,
		placeholder,
		textarea,
		defaultValue,
		required,
		readonly,
		borderRadius,
		meta,
	} = props;
	// Hooks
	const {t} = useTranslation();
	// Data
	const {touched, error} = meta;

	// Render
	if (textarea) {
		return (
			<Wrapper {...props}>
				<Text>
					{t(label)}
				</Text>
				<Label borderRadius={borderRadius} textarea={textarea}>
					<Textarea
						readOnly={readonly}
						required={required}
						autocomplete="off"
						defaultValue={defaultValue}
						value={value}
						padding={padding}
						onKeyPress={onKeyPress}
						autoCorrect="off"
						spellCheck="off"
						onChange={input.onChange}
						type={type}
						{...input}
						autoComplete="off"
						placeholder={t(placeholder)}
					/>
				</Label>
				<Text>
					{touched && (error && <span>{error}</span>)}
				</Text>
			</Wrapper>
		);
	}
	return (
		<Wrapper {...props}>
			<Text>
				{t(label)}
			</Text>
			<Label borderRadius={borderRadius}>
				<Input
					padding={padding}
					required={required}
					defaultValue={defaultValue}
					value={value}
					readOnly={readonly}
					autocomplete="off"
					autoCorrect="off"
					spellCheck="off"
					onKeyPress={onKeyPress}
					onChange={input.onChange}
					type={type}
					{...input}
					autoComplete="off"
					placeholder={t(placeholder)}
				/>
			</Label>
			<Text>
				{touched && (error && <span>{error}</span>)}
			</Text>
		</Wrapper>
	);
}

export default TextField;

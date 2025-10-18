import styled from 'styled-components';
import {Button as BButton} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import ButtonLoader from './ButtonLoader';

const StyledButton = styled(BButton)`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  font-size: 16px !important;
  background-color: ${({variant}) => variant === 'primary' && '#fff !important'};
  color: ${({variant}) => variant === 'primary' && '#0d6efd !important'};

  & > svg {
    margin-left: 12px;
    margin-bottom: 3px;
  }

  ${({styles}) => styles}
`;

const Button = (props) => {
	const {variant, onClick, loading, styles, label, leftIcon, rightIcon} = props;
	const {t} = useTranslation();
	return (
		<StyledButton
			onClick={onClick}
			variant={variant}
			styles={styles}>
			{loading
				? <ButtonLoader/>
				: <>
					{leftIcon}
					{t(label)}
					{rightIcon}
				</>}
		</StyledButton>
	);
};

Button.propTypes = {
	loading:PropTypes.bool,
	variant:PropTypes.string,
	styles:PropTypes.object,
	leftIcon:PropTypes.element,
	rightIcon:PropTypes.element,
	label:PropTypes.string,
	onClick:PropTypes.func
};


export default Button;

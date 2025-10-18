import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styles
const Parent = styled('p')`
  font-style: normal;
  font-weight: normal;
  font-size: ${({standard}) => standard ? '15px' : '16px'};
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #333333;
  ${({styles}) => styles}
`;

const Child = styled('p')`
  font-style: normal;
  font-weight: ${({standard}) => standard ? '500' : '600'};
  font-size: ${({standard}) => standard ? '15px' : '16px'};
  line-height: 18px;
  text-align: right;
  color: #333333;
  ${({styles}) => styles}
`;

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

// Component
function Description(props) {
	// Props data
	const {
		child, parent, childStyles, parentStyles, style, standard
	} = props;
	// Render
	return (
		<Wrapper stle={{...style}} {...props}>
			<Parent standard={standard} styles={parentStyles}>
				{parent}
			</Parent>
			<Child standard={standard} styles={childStyles}>
				{child}
			</Child>
		</Wrapper>
	);
}

Description.propTypes = {
	parent:PropTypes.any.isRequired,
	child:PropTypes.any,
	childStyles:PropTypes.object,
	parentStyles:PropTypes.object,
	standard:PropTypes.bool
};

export default Description;

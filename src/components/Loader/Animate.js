import styled from 'styled-components';

const Wrapper = styled('div')`
  & {
    color: #4F71DCFF;
    position: relative;
    font-size: 11px;
    background: #4F71DCFF;
    animation: escaleY 1s infinite ease-in-out;
    width: 8px;
    height: 4em;
    animation-delay: -0.16s;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 2em;
    background: #4F71DCFF;
    width: 8px;
    height: 4em;
    animation: escaleY 1s infinite ease-in-out;
  }

  &:before {
    left: -2em;
    animation-delay: -0.32s;
  }

  @keyframes escaleY {
    0%, 80%, 100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

const Animate = () => {
	return (
		<Wrapper />
	);
};

export default Animate;

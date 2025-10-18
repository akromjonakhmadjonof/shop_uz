import styled from 'styled-components';
import Loader from 'components/Loader';

const Wrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: rgb(255 255 255 / 31%);
  z-index: 1000000;
  align-items: center;
  justify-content: center;
`;

const GlobalLoader = () => {
	return (
		<Wrapper>
			<Loader/>
		</Wrapper>
	);
};


export default GlobalLoader;

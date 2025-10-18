import styled from 'styled-components';

export const Title = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-family: var(--base-font-family);
  font-size: 28px;
	margin-bottom: 20px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${({theme}) => theme.color.dark.dark_grey};
  ${({styles}) => styles}
`;

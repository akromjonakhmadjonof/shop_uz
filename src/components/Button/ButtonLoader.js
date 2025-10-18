import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const animation = keyframes`
  from {background: #000;} to {background: #fff;}
`

const Loader = styled('div')`
  display: block;
  position: relative;
  width: ${({ size }) => size * 35}px;
  height: ${({ size }) => size * 35}px;
  margin: 10px auto;
  ${({ styles }) => styles}
`
const Inner = styled('div')`
  width: ${({ size }) => (size >= 2) ? 3 : (size <= 0.7) ? 1 : 1.5}px;
  height: ${({ size }) => size ? size * 8 : 8}px;
  background: #fff;
  position: absolute;
  left: 44.5%;
  top: 37%;
  border-radius: 12px;
  animation: ${animation} 1s linear infinite;
  ${props => props.one && css`
    transform: rotate(-330deg) translate(0px, -142%);
    animation-delay: -0.916s;
  `}
  ${props => props.two && css`
    transform: rotate(-300deg) translate(0px, -142%);
    animation-delay: -0.833s;
  `}
  ${props => props.three && css`
    transform: rotate(-270deg) translate(0px, -142%);
    animation-delay: -0.75s;
  `}
  ${props => props.four && css`
    transform: rotate(-240deg) translate(0px, -142%);
    animation-delay: -0.666s;
  `}
  ${props => props.five && css`
    transform: rotate(-210deg) translate(0px, -142%);
    animation-delay: -0.583s;
  `}
  ${props => props.six && css`
    transform: rotate(-180deg) translate(0px, -142%);
    animation-delay: -0.5s;
  `}
  ${props => props.seven && css`
    transform: rotate(-150deg) translate(0px, -142%);
    animation-delay: -0.416s;
  `}
  ${props => props.eight && css`
    transform: rotate(-120deg) translate(0px, -142%);
    animation-delay: -0.333s;
  `}
  ${props => props.nine && css`
    transform: rotate(-90deg) translate(0px, -142%);
    animation-delay: -0.25s;
  `}
  ${props => props.ten && css`
    transform: rotate(-60deg) translate(0px, -142%);
    animation-delay: -0.166s;
  `}
  ${props => props.eleven && css`
    transform: rotate(-30deg) translate(0px, -142%);
    animation-delay: -0.083s;
  `}
  ${props => props.twelve && css`
    transform: rotate(-0deg) translate(0px, -142%);
    animation-delay: 0s;
  `}
`

export default ({ size = 0.5, styles }) => {
	return (
		<Loader styles={styles} size={size}>
			<Inner size={size} one />
			<Inner size={size} two />
			<Inner size={size} three />
			<Inner size={size} four />
			<Inner size={size} five />
			<Inner size={size} six />
			<Inner size={size} seven />
			<Inner size={size} eight />
			<Inner size={size} nine />
			<Inner size={size} ten />
			<Inner size={size} eleven />
			<Inner size={size} twelve />
		</Loader>
	)
}

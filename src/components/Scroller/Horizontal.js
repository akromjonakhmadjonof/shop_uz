import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import {compose, lifecycle} from 'recompose';
import {fromEvent} from 'rxjs';
import {ChevronLeft, ChevronRight} from 'react-feather';

const SCROLL_TIME = 100;
const SCROLL_SPEED = 50;

const StyledContainer = styled(Container)`
  display: flex;
  position: relative;
  padding-left: 40px;
  padding-right: 60px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 0;
  }

  & > p:first-child {
    margin-left: 20px !important;
  }
`;
const Wrapper = styled('div')`
  position: relative;
  overflow: hidden;
`;
const ArrowRight = styled('div')`
  width: 52px;
  height: 90px;
  background: rgb(250, 250, 250);
  background: linear-gradient(90deg, rgba(250, 250, 250, 0.5665616588432247) 0%, rgba(250, 250, 250, 1) 100%);
  z-index: 11;

  & > div {
    & svg:first-child {
      margin-right: -13px;
      margin-left: 10px;
    }
  }

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
`;
const ArrowLeft = styled('div')`
  cursor: pointer;
  width: 52px;
  z-index: 11;
  height: 90px;

  & > div {
    & svg:first-child {
      margin-right: -13px;
    }

    & svg:last-child {
      margin-right: 10px;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 4px 4px 0 !important;
  background: rgb(250, 250, 250);
  background: linear-gradient(90deg, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0.5665616588432247) 100%);
  color: white;
`;

const Arrows = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & svg {
    color: ${({theme}) => theme.color.grey};
  }
`;

const enhance = compose(
	lifecycle({
		componentDidMount() {
			const classes = {
				hidden:'hidden',
			};
			const wrapper = document.getElementById('scrollWrapper');
			const scrollToLeft = document.getElementById('scrollToLeft');
			const scrollToRight = document.getElementById('scrollToRight');
			const mouseenterToLeft$ = fromEvent(scrollToLeft, 'mouseenter');
			const mouseleaveToLeft$ = fromEvent(scrollToLeft, 'mouseleave');
			const mouseleaveToRight$ = fromEvent(scrollToRight, 'mouseleave');
			const mouseenterToRight$ = fromEvent(scrollToRight, 'mouseenter');
			let intervalActive = null;
			if (wrapper) {
				scrollToLeft.classList.add(classes.hidden);
				const hiddenRightScroll = wrapper.scrollWidth - wrapper.scrollLeft === wrapper.clientWidth;
				hiddenRightScroll && scrollToRight.classList.add(classes.hidden);
				mouseenterToLeft$.subscribe(() => {
					scrollToRight.classList.remove(classes.hidden);
					intervalActive = setInterval(() => {
						wrapper.scrollLeft -= SCROLL_SPEED;
					}, SCROLL_TIME);
				});
				mouseleaveToLeft$.subscribe(() => {
					if (intervalActive) {
						const hasLeftScroll = wrapper.scrollLeft === 0;
						hasLeftScroll ? scrollToLeft.classList.add(classes.hidden) : scrollToLeft.classList.remove(classes.hidden);
						clearInterval(intervalActive);
					}
				});
				mouseenterToRight$.subscribe(() => {
					scrollToLeft.classList.remove(classes.hidden);
					intervalActive = setInterval(() => {
						wrapper.scrollLeft += SCROLL_SPEED;
					}, SCROLL_TIME);
				});
				mouseleaveToRight$.subscribe(() => {
					if (intervalActive) {
						const hasRightScroll = wrapper.scrollWidth - wrapper.scrollLeft === wrapper.clientWidth;
						hasRightScroll ? scrollToRight.classList.add(classes.hidden) : scrollToRight.classList.remove(classes.hidden);
						clearInterval(intervalActive);
					}
				});
			}
		},
	}),
);

const Horizontal = enhance((props) => {
	const {children} = props;
	return (
		<Wrapper>
			<StyledContainer id="scrollWrapper">
				{children}
			</StyledContainer>
			<Arrows>
				<ArrowLeft id="scrollToLeft">
					<div>
						<ChevronLeft/>
						<ChevronLeft/>
					</div>
				</ArrowLeft>
				<ArrowRight id="scrollToRight">
					<div>
						<ChevronRight/>
						<ChevronRight/>
					</div>
				</ArrowRight>
			</Arrows>
		</Wrapper>
	);
});

export default Horizontal;

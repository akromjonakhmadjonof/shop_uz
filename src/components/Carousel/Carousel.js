import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {anons} from 'constants/test/brands';
import _ from 'lodash';
import styled from 'styled-components';

const Item = styled('div')`
    width: 100%;
    height: 428px;
		& img {
			width: 100%;
      height: 100%;
			object-fit: cover;
		}
	`;

const Wrapper = styled('div')`
	width: 100%;
	.slick-list {
		border-radius: 15px;
	}
`;

function Carousel(props) {
	const {items, customSettings} = props;
	const settings = customSettings || {
		dots:false,
		infinite:true,
		speed:500,
		slidesToShow:1,
		slidesToScroll:1,
		autoplay:true,
		autoplaySpeed:2000,
		cssEase:'linear',
	};
	const object = items || anons;
	return (
		<Wrapper>
			<Slider {...settings}>
				{
					_.map(object, (item, key) => {
						const img = _.get(item, ['link']);
						const href = _.get(item, ['href']);
						return (
							<Item key={key} img={img}>
								<img src={img} alt=""/>
							</Item>
						);
					})
				}
			</Slider>
		</Wrapper>
	);
}

export default Carousel;

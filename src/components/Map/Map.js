import React, {useEffect, useRef, useState} from 'react';
import {GeolocationControl, Map as YandexMap, Placemark, YMaps} from 'react-yandex-maps';
import PropTypes from 'prop-types';
import {API_KEY_YANDEX} from 'constants/yandex';

const Map = props => {
	const {
		input,
		coords,
		setCoords,
		lon,
		lat,
		height,
		zoom,
		secondLat,
		secondLon,
		getAddress,
		onLoad
	} = props;

	const defaultCoords = [lat && lat, lon && lon];
	const secondCoords = (secondLat && secondLon) && [secondLat, secondLon];

	// const [map, setMap] = useState(null)
	const [ymaps, setYmaps] = useState(null);
	const [address, setAddress] = useState(null);
	const [fullAddress, setFullAddress] = useState(null);

	const mapData = {
		center:(coords && coords[0] && coords) || defaultCoords,
		zoom:zoom || 14
	};

	const mapRef = useRef(null);
	// const setElementRef = element => {
	//   setMap(element)
	// }

	const setPlacemark = (e) => {
		const coords = e.get('coords');
		coords && setCoords(coords);
	};

	useEffect(() => {
		setAddress('Akromjon Axmadjonov');
		setFullAddress('Akromjon Axmadjonov');
		const geocode = () => {
			ymaps && ymaps.geocode(coords)
				.then(result => {
					const geo = result.geoObjects.get(0);
					const localities = geo.getLocalities().splice(1, 1);
					const administrativeAreas = geo.getAdministrativeAreas().splice(1, 1);
					const fullGeoName = geo.getAddressLine();
					const geoName = [
						localities.length ? localities : administrativeAreas,
						geo.getThoroughfare() || geo.getPremise()
					].filter(Boolean).join(',');
					const finalGeoName = (geoName[0] === ',') ? geoName.substr(1) : geoName;
					getAddress && getAddress(finalGeoName);
					setAddress(finalGeoName);
					setFullAddress(fullGeoName);
				});
		};
		return geocode();
	}, [coords, ymaps, getAddress]);

	// Render
	return (
		<YMaps
			ref={mapRef}
			query={{apikey:`${API_KEY_YANDEX}&lang=ru_RU`, kind:'house'}}
		>
			<YandexMap
				onLoad={(ymaps) => {
					setYmaps(ymaps);
					onLoad && onLoad(!ymaps);
				}}
				modules={['geocode']}
				onClick={input && setPlacemark}
				// instanceRef={setElementRef}
				width={'100%'}
				height={height || 'calc(100vh - 60px)'}
				defaultState={mapData}
			>
				<GeolocationControl options={{float:'left'}}/>
				<Placemark
					properties={{iconCaption:address || 'Магазин', balloonContent:fullAddress}}
					geometry={(coords && coords[0] && coords) || defaultCoords}
					options={{
						iconColor:'red'
					}}
				/>
				{secondCoords &&
					<Placemark
						properties={{iconCaption:'Агент', balloonContent:fullAddress}}
						geometry={secondCoords && secondCoords}
						options={{
							iconColor:'blue'
						}}
					/>}
			</YandexMap>
		</YMaps>
	);
};

Map.propTypes = {
	lat:PropTypes.string.isRequired,
	lon:PropTypes.string.isRequired,
	zoom:PropTypes.number
};

Map.defaultProps = {
	zoom:12
};

export default Map;

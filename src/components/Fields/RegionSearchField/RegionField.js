import RegionSearchField from './RegionSearchField';

function RegionField(props) {
	const {
		city,
		country,
		state,
		stateData,
		countryData,
		cityData,
	} = props;

	return (
		<RegionSearchField
			city={city}
			state={state}
			country={country}
			countries={countryData}
			cities={cityData}
			states={stateData}
		/>
	);
}

export default RegionField;

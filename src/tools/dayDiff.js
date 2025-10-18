import moment from 'moment';

const dayDiff = (startDay, endDay) => {
	const endDayCustom = endDay ? moment(endDay).toArray() : moment().toArray()
	const startDayCustom = startDay ? moment(startDay).toArray() : moment().toArray()

	return moment(startDayCustom).diff(moment(endDayCustom), 'days');
}

export default dayDiff

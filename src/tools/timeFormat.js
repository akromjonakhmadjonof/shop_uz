import moment from 'moment';

const timeFormat = (time, defaultText) => ((time) ? moment(time).locale('ru').format('HH:mm') : defaultText);

export default timeFormat;

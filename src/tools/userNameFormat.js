import _ from 'lodash';

const userNameFormat = (userName, defaultText) => {
	if (userName) {
		const firstElement = _.get(userName, ['0']);
		if (firstElement === '@') {
			return _.slice(userName, 1, _.size(userName));
		} else {
			return ('@' + userName);
		}
	} else {
		return defaultText;
	}
};

export default userNameFormat;

import _ from 'lodash';

export const signInSerializer = (data) => {
	const userName = _.get(data, 'userName');
	const password = _.get(data, 'password');
	return {
		user_name:userName,
		password,
	};
};

export const signUpSerializer = (data) => {
	const face = _.get(data, ['face']);
	const fullName = _.get(data, ['fullName']);
	const userName = _.get(data, 'userName');
	const company = _.get(data, ['company']);
	const password = _.get(data, 'password');
	const emails = [_.get(data, ['email'])];
	const phones = [_.get(data, ['phoneNumber'])];
	const direction = _.get(data, ['direction']);
	const brand = _.get(data, ['brand']);
	if (face === 'individual') {
		return {
			face,
			data:{},
			full_name:fullName,
			phones,
			emails,
			login:{
				user_name:userName,
				password,
			},
			social_links:{},
			settings:{},
		};
	}
	return {
		face,
		full_name:company,
		phones,
		emails,
		data:{
			direction,
			brand,
		},
		login:{
			user_name:userName,
			password,
		},
		social_links:{},
		settings:{},
	};
};

export const settingsSerializer = (data, type) => {
	const email = _.get(data, ['email']);
	const fullName = _.get(data, ['fullName']);
	const userName = _.get(data, ['userName']);
	const password = _.get(data, ['password']);
	const phoneNumber = _.get(data, ['phoneNumber']);
	const address = _.get(data, ['address']);
	if (type === 'account_information') {
		return {
			email,
			full_name:fullName,
			type,
			user_name:userName,
		};
	}
	if (type === 'change_password') {
		return {
			password,
			type,
		};
	}
	if (type === 'contact_settings') {
		return {
			phone_number:phoneNumber,
			address,
			type,
		};
	}
	return {
		...data,
	};
};

export const completeSignUpSerializer = (data) => {
	const image = {
		name:_.get(data, ['userImage', 'name']),
		src:_.get(data, ['userImage', 'src']),
		file_name:_.get(data, ['userImage', 'fileName'])
	};
	const phones = _.map(_.get(data, ['phones']), (item) => {
		return _.get(item, ['phone']);
	});
	const emails = _.map(_.get(data, ['emails']), (item) => {
		return _.get(item, ['phone']);
	});
	const description = _.get(data, ['description']);
	const facebook = _.get(data, ['facebook']);
	const instagram = _.get(data, ['instagram']);
	const telegram = _.get(data, ['telegram']);
	const twitter = _.get(data, ['twitter']);
	const userName = _.get(data, ['userName']);
	return {
		description,
		facebook,
		instagram,
		image,
		telegram,
		twitter,
		phones,
		emails,
		user_name:userName
	};
};

import {getValue} from './storage/storage';

const LANGUAGE = 'language';

const getLanguageName = (type) => {
	switch (type) {
	case 'ru':
		return 'Русский';
	case 'en':
		return 'English';
	case 'uz':
		return 'O\'zbek';
	default:
		return 'Русский';
	}
};

export default getLanguageName;

export const getLanguageKey = () => getValue(LANGUAGE);

import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';

const enhance = compose(
	connect((state) => {
		const languageKey = _.get(state, ['language', 'key']) || 'ru';
		return {
			languageKey,
		};
	}),
);

export function LanguageProvider(props) {
	return (
		<>
			{props.children}
		</>
	);
}

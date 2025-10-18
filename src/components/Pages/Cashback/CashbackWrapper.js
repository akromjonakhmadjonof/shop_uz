import React from 'react';
import useFetchList from 'hooks/useFetchList';
import {cashbackListFetchAction} from 'actions/cashback';
import * as STATE from 'store/state';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import Cashback from './Cashback';

const enhance = compose(
	connect((state) => {
		const cashbacks = _.get(state, ['cashbacks', 'data', 'documents']);
		const loading = _.get(state, ['cashbacks', 'loading']);
		return {
			cashbacks,
			loading,
		};
	}),
);

function CashbackWrapper(props) {
	const {
		cashbacks,
		loading,
	} = props;
	useFetchList({
		action:() => cashbackListFetchAction(),
		state:STATE.CASHBACKS,
	});
	return (
		<Cashback
			cashbacks={cashbacks}
			loading={loading ? 1 : 0}
		/>
	);
}

export default enhance(CashbackWrapper);

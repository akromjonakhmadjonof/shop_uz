import React from 'react';
import PropTypes from 'prop-types';
import {Router, Switch, Route} from 'react-router-dom';
import routes from 'location';
import _ from 'lodash';
import MultiRouter from 'location/MultiRouter';
import NotFound from 'components/NotFound';
import Snackbar from 'components/Snackbar';
import DeleteDialog from 'components/Dialog';
import {connect} from 'react-redux';
import {authAction} from './actions/auth';
import Error from './components/Error/Error';
import {compose, lifecycle} from 'recompose';
import io from 'socket.io-client';
import {getToken} from './tools/storage/storage';
import ConsoleProvider from './providers/ConsoleProvider';

export const socket = io.connect('http://localhost:9998/', {
    auth: {
        token: getToken()
    }, query: {}
});

const enhance = compose(connect(), lifecycle({
    componentDidMount() {
        const dispatch = this.props.dispatch;
        const token = getToken()
        token && dispatch(authAction());
    }
}),);

// Base app
function App(props) {
    // Props data
    const {history} = props;

    // Render
    return (<>
        <ConsoleProvider>
            <Snackbar/>
            <DeleteDialog/>
            <Error/>
            <Router history={history}>
                <Switch>
                    {_.map(routes, (route, key) => (<MultiRouter key={key} {...route} />))}
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </ConsoleProvider>
    </>);
}

App.propTypes = {
    store: PropTypes.any.isRequired, history: PropTypes.any.isRequired,
};

export default enhance(App);

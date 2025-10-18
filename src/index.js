import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'store/createStore';
import {syncHistoryWithStore} from 'react-router-redux';
import {createBrowserHistory} from 'history';
import {getMuiTheme} from 'material-ui/styles';
import {theme} from 'tools/theme';
import {ThemeProvider} from '@mui/material';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/normalize.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {StylesProvider} from '@material-ui/core';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import App from './App';
import locales from './constants/locales';
import {getLanguage} from './tools/storage/storage';
import process from "process";
import {Router} from "react-router-dom";
// expose for libs that expect a global
window.process = process;
// optional: set a default env for checks like (process.env.NODE_ENV)
if (!window.process.env) window.process.env = {NODE_ENV: "development"};
window.process = {
    env: {NODE_ENV: 'development'}
};
// Tools
const store = createStore();
const history = createBrowserHistory();
// Initialize translate
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            ...locales,
        }, lng: getLanguage(), // if you're using a language detector, do not define the lng option
        fallbackLng: getLanguage(),

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });
// Render
ReactDOM.render(<Provider store={store}>
    <StylesProvider injectFirst>
        <StyledThemeProvider theme={getMuiTheme(theme)}>
            <ThemeProvider theme={getMuiTheme(theme)}>
                <App
                    history={history}
                    store={store}
                />
            </ThemeProvider>
        </StyledThemeProvider>
    </StylesProvider>
</Provider>, document.getElementById('wrapper'),);

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import indexApp from './reducers/index';
import App from './app';
import { Router, Route, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PollResults from './components/pollResults';

const loggerMiddleware = createLogger();

let store = createStore(indexApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="admin/:id" component={App} />
            <Route path="admin/:id/:poll/results" component={PollResults} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import indexApp from './reducers/index';
import App from './app';
import PollView from './components/PollView';
import { Router, Route, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PollResults from './components/pollResults';
import Login from './auth/login.component';
import Dashboard from './dashboard/dashboard.component';

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
            <Route path="/admin" component={App}>
                <Route path="login" component={Login} />
                <Route path="dashboard" component={Dashboard} />
                <Route path="poll" component={PollView} />
                <Route path="poll/:id/:poll/results" component={PollResults} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
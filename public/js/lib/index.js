import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import indexApp from './reducers/index';
import App from './app';
import PollList from './poll/pollList';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PollResults from './poll/pollResults';
import EditPoll from './poll/edit.component';
import ManagePoll from './poll/manage.component';
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
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard} />
                <Route path="login" component={Login} />
                <Route path="dashboard" component={Dashboard} />
                <Route path="interaction/:id/edit" component={EditPoll} />
                <Route path="interaction/:id/results" component={PollResults} />
                <Route path="interaction/:id/manage" component={ManagePoll} />
                <Route path="interaction" component={PollList} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
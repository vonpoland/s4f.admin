import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers  } from 'redux';
import todoApp from './reducers/index';
import App from './app';
import { Router, Route, browserHistory  } from 'react-router';
import Footer from './components/footer';
import { syncHistoryWithStore } from 'react-router-redux';
import PollResults from './components/pollResults';

const loggerMiddleware = createLogger();

let store = createStore(todoApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Footer} />
            <Route path="/:id" component={App} />
            <Route path="/:id/:poll/edit" component={Footer} />
            <Route path="/:id/:poll/results" component={PollResults} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
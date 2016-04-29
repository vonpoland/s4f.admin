import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers  } from 'redux';
import Login from './auth/login.component';
import authReducer from './auth/reducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, Route, browserHistory  } from 'react-router';

const loggerMiddleware = createLogger();

let store = createStore(combineReducers({ authData: authReducer, routing : routerReducer}),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="admin/login" component={Login} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
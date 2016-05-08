import db from '../repositories/db';
import {hasAnyErrorsSet} from '../errors/service';
import { browserHistory  } from 'react-router';

export const AUTH = {
    LOGGING_USER: 'AUTH_LOGGING_USER',
    LOGGED_USER: 'AUTH_LOGGED_USER',
    LOG_FAILED: 'AUTH_LOG_FAILED',
    VALIDATION_RESULT: 'AUTH_VALIDATION_RESULT',
    FETCHING_LOGGED_USER: 'AUTH_LOGGED_USER_FETCHING',
    LOGGED_USER_FETCHED: 'AUTH_LOGGED_USER_FETCHED',
    LOGGED_USER_FETCH_FAILED: 'AUTH_LOGGED_USER_FETCH_FAILED',
    LOG_OUT_USER_START: 'AUTH_LOG_OUT_USER_START',
    LOG_OUT_USER_SUCCESS: 'AUTH_LOGGED_OUT_USER_SUCCESS',
    LOG_OUT_USER_FAILED: 'AUTH_LOGGING_OUT_USER_FAILED'
};

function loggingUser() {
    return {
        type: AUTH.LOGGING_USER
    };
}

function loggedUser(auth) {
    return {
        type: AUTH.LOGGED_USER,
        auth: auth
    };
}

function logFailed(auth) {
    return {
        type: AUTH.LOG_FAILED,
        auth: auth
    };
}

function validationResult(validation) {
    return {
        type: AUTH.VALIDATION_RESULT,
        validation: validation
    };
}

function validateUserAndPassword(user, password) {
    var errors = {
        username: {length: user.trim().length === 0},
        password: {length: password.trim().length === 0}
    };

    return errors;
}

function fetchingLoggedUser() {
    return {
        type: AUTH.FETCHING_LOGGED_USER
    };
}

function loggedUserFetched(user) {
    return {
        type: AUTH.LOGGED_USER_FETCHED,
        user: user
    };
}

function loggedUserFetchFailed() {
    return {
        type: AUTH.LOGGED_USER_FETCH_FAILED
    };
}

export function getLoggedUser() {
    return function(dispatch) {
        dispatch(fetchingLoggedUser());

        return db.auth.loggedUser()
            .then(response => response.json())
            .then(user => dispatch(loggedUserFetched(user)))
            .catch(() => dispatch(loggedUserFetchFailed));
    };
}

function moveUserToDashBoard(loginResult) {
    if (loginResult && loginResult.redirect) {
        browserHistory.push(loginResult.redirect);
    }
}

function moveUserToLogin() {
    browserHistory.push('/admin/login');
}

function handleLoginResult(loginResult) {
    return loginResult.errorMessage ? Promise.reject(loginResult.errorMessage) : loginResult;
}

function loggingOutUser() {
    return {
        type: AUTH.LOG_OUT_USER_START
    };
}

function logoutUserSuccess() {
    return {
        type: AUTH.LOG_OUT_USER_SUCCESS
    };
}

function logoutUserFailed() {
    return {
        type: AUTH.LOG_OUT_USER_FAILED
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(loggingOutUser());
        return db.auth.logout()
            .then(() => {
                dispatch(logoutUserSuccess());
                moveUserToLogin();
            })
            .catch(() => dispatch(logoutUserFailed()));
    };
}

export function login(user, password) {
    return function (dispatch) {
        var validation = validateUserAndPassword(user, password);

        if (hasAnyErrorsSet(validation)) {
            return dispatch(validationResult(validation));
        }

        dispatch(validationResult(validation));
        dispatch(loggingUser());

        return db.auth.login(user, password)
            .then(response => response.json())
            .then(handleLoginResult)
            .then(auth => {
                dispatch(loggedUser(auth));
                moveUserToDashBoard(auth);
            })
            .then(() => dispatch(getLoggedUser()))
            .catch(error => dispatch(logFailed(error)));
    };
}
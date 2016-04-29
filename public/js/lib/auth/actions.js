import db from '../repositories/db';
import {hasAnyErrorsSet} from '../errors/service';

export const AUTH = {
    LOGGING_USER: 'AUTH_LOGGING_USER',
    LOGGED_USER: 'AUTH_LOGGED_USER',
    VALIDATION_RESULT: 'AUTH_VALIDATION_RESULT'
};

function loggingUser() {
    return {
        type: AUTH.LOGGING_USER
    };
}

function loggedUser(data) {
    return {
        type: AUTH.LOGGED_USER,
        user: data
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
            .then(user => dispatch(loggedUser(user)));
    };
}
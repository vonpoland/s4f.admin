import {AUTH} from './actions';

export default function authReducer(state = { logging : false, validation : {} }, action) {
    switch(action.type) {
    case AUTH.LOGGING_USER:
        {
            return {
                ...state,
                logging: true
            };
        }
    case AUTH.LOGGED_USER:
        {
            var loginFailed = typeof (action.user.errorMessage) !== 'undefined';

            if(!loginFailed) {
                window.location = 'tychy';
            }

            return {
                ...state,
                loginFailed: loginFailed,
                user: action.user,
                logging: false
            };
        }
    case AUTH.VALIDATION_RESULT:
        {
            return {
                ...state,
                validation: action.validation
            };
        }
    default:
        {
            return state;
        }
    }
}
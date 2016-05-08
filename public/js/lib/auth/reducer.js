import {AUTH} from './actions';

export default function authReducer(state = { logging : false, validation : {}, auth: null }, action) {
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
            return {
                ...state,
                auth: action.auth,
                logging: false
            };
        }
    case AUTH.LOG_OUT_USER_SUCCESS:
        {
            return {
                ...state,
                auth: null
            };
        }
    case AUTH.LOGGED_USER_FETCHED: {
        return {
            ...state,
            auth: action.user
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
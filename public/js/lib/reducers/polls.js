import {REQUEST_POLLS,
    RECEIVE_POLLS,
    CHANGE_LOCATION,
    FETCH_POLL_SUCCESS,
    FETCH_ANSWER_SUCCESS,
    FETCH_POLL_START,
    CHANGE_POLL_PROPERTY,
    SAVE_POLL_START,
    SAVE_POLL_SUCCESS,
    SAVE_POLL_FAILED,
    TOGGLE_AUTO_SWITCH,
    UPDATE_POLL_START} from '../poll/actions';
import {getPath} from '../routing/routing';

export function poll(state = { modifications : {} }, action = {}) {
    switch(action.type) {
    case FETCH_POLL_SUCCESS:
        {
            return {
                ...state,
                ...action.poll
            };
        }
    case SAVE_POLL_SUCCESS:
        {
            return {
                ...state,
                successMessage: (typeof action.options === 'undefined') || action.options.successMessage,
                isFormLocked : false,
                modifications: {}
            };
        }
    case SAVE_POLL_FAILED:
        {
            return {
                ...state,
                successMessage: false,
                isFormLocked : false
            };
        }
    case SAVE_POLL_START:
        {
            return {
                ...state,
                successMessage: false,
                isFormLocked : true
            };
        }
    case CHANGE_POLL_PROPERTY:
        {
            let modification = {};

            modification[action.propertyName] = action.newValue;

            return {
                ...state,
                modifications : {
                    ...state.modifications,
                    ...modification
                }
            };
        }
    case FETCH_POLL_START:
        {
            return { modifications : {}};
        }
    case TOGGLE_AUTO_SWITCH:
        {
            return {
                ...state,
                autoSwitch: action.value
            };
        }
    case UPDATE_POLL_START:
        {
            return {
                ...state,
                modifications : {
                    ...state.modifications,
                    ...action.modifications
                }
            };
        }
    default:
        {
            return state;
        }
    }
}

function polls(state = { poll : { modifications : {}}}, action) {
    switch (action.type) {
    case FETCH_POLL_SUCCESS:
    case FETCH_POLL_START:
    case SAVE_POLL_START:
    case SAVE_POLL_SUCCESS:
    case SAVE_POLL_FAILED:
    case UPDATE_POLL_START:
    case TOGGLE_AUTO_SWITCH:
    case CHANGE_POLL_PROPERTY: {
        return {
            ...state,
            poll : poll(state.poll, action)
        };
    }
    case CHANGE_LOCATION:
        {
            return {
                ...state,
                ...getPath(action.payload)
            };
        }
    case FETCH_ANSWER_SUCCESS:
        {
            return {
                ...state,
                answers: action.answers
            };
        }
    case REQUEST_POLLS:
        {
            return {
                ...state,
                isFetching: true,
                poll: poll()
            };
        }
    case RECEIVE_POLLS:
        {
            return {
                ...state,
                isFetching: false,
                polls: action.polls
            };
        }
    default:
        {
            return state;
        }
    }
}

export default polls;
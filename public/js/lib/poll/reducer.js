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
    NOTIFICATION_DISPLAYED} from './actions';
import {getPath} from '../routing/routing';
import R from 'ramda';

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
            var pathLens = R.lensPath(action.propertyPath.split('.'));
            var copy = Object.assign({}, state.modifications);
            var modifications = R.set(pathLens, action.newValue, copy);

            return {
                ...state,
                modifications : modifications
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
    default:
        {
            return state;
        }
    }
}

function polls(state = { poll : { modifications : {}}}, action = {}) {
    switch (action.type) {
    case FETCH_POLL_SUCCESS:
    case FETCH_POLL_START:
    case SAVE_POLL_START:
    case SAVE_POLL_FAILED:
    case TOGGLE_AUTO_SWITCH:
    case CHANGE_POLL_PROPERTY: {
        return {
            ...state,
            poll : poll(state.poll, action)
        };
    }
    case NOTIFICATION_DISPLAYED:
        {
            return {
                ...state,
                canDeleteNotification: true
            };
        }
    case SAVE_POLL_SUCCESS:
        {
            return {
                ...state,
                poll : poll(state.poll, action),
                successMessage: 'Interaction was saved'
            };
        }
    case CHANGE_LOCATION:
        {
            let newState = state.isFetching ? polls() : state;
            let successMessage = state.successMessage;
            let canDeleteNotification = state.canDeleteNotification;

            if (state.canDeleteNotification) {
                successMessage = null;
                canDeleteNotification = false;
            }

            return {
                ...newState,
                successMessage,
                canDeleteNotification,
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
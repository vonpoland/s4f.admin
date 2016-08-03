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
    POLL_RESULTS_NAME_CHANGE,
    POLL_RESULTS_NAME_SAVE_START,
    POLL_RESULTS_NAME_SAVE_FAILED,
    POLL_RESULTS_NAME_SAVE_FINISHED,
    POLL_RESULTS_CHANGE,
    POLL_RESULTS_CLEAR_START,
    POLL_RESULTS_CLEAR_FINISHED,
    POLL_RESULTS_CLEAR_FAILED,
    NOTIFICATION_DISPLAYED,} from './actions';
import {getPath} from '../routing/routing';
import R from 'ramda';
import {getVotesForPollResults} from './poll.service';

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
    case POLL_RESULTS_NAME_CHANGE:
        {
            return {
                ...state,
                resultsName: action.value,
                isSaveResultsNameButtonEnabled : action.value.trim().length > 0
            }
        }
    case POLL_RESULTS_NAME_SAVE_START:
        {
            return {
                ...state,
                isSaveResultsNameButtonEnabled: false,
                isSaveResultsNameInputDisabled: true,
                isClearResultsButtonDisabled: true
            }
        }
    case POLL_RESULTS_NAME_SAVE_FAILED:
    case POLL_RESULTS_NAME_SAVE_FINISHED:
        {
            return {
                ...state,
                isSaveResultsNameButtonEnabled: true,
                isSaveResultsNameInputDisabled: false,
                isClearResultsButtonDisabled: false,
                resultsName: ''
            }
        }
    case POLL_RESULTS_CHANGE: {
        return {
            ...state,
            enableRevertResultsButton: action.value && action.value.length > 0,
            votes: getVotesForPollResults(state, action.value)
        }
    }
    case POLL_RESULTS_CLEAR_START: {
        return {
            ...state,
            disableCloseClearResultsModalButton: true
        }
    }
    case POLL_RESULTS_CLEAR_FINISHED:
    case POLL_RESULTS_CLEAR_FAILED: {
        return {
            ...state,
            disableCloseClearResultsModalButton : false
        }
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
    case POLL_RESULTS_NAME_CHANGE:
    case TOGGLE_AUTO_SWITCH:
    case POLL_RESULTS_CHANGE:
    case POLL_RESULTS_NAME_SAVE_START:
    case POLL_RESULTS_NAME_SAVE_FAILED:
    case POLL_RESULTS_NAME_SAVE_FINISHED:
    case POLL_RESULTS_CLEAR_START:
    case POLL_RESULTS_CLEAR_FINISHED:
    case POLL_RESULTS_CLEAR_FAILED:
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
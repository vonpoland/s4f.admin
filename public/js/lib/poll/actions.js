import db from '../repositories/db';
import {mapProperties} from './poll.service';

export const REQUEST_POLLS = 'REQUEST_POLLS';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const CHANGE_STEP_START = 'CHANGE_STEP_START';
export const CHANGE_STEP_FAILED = 'CHANGE_STEP_FAILED';
export const CHANGE_STEP_FINISHED = 'CHANGE_STEP_FINISHED';
export const CHANGE_LOCATION = '@@router/LOCATION_CHANGE';
export const FETCH_ANSWER_START = 'FETCH_ANSWER_START';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILED = 'FETCH_ANSWER_FAILED';
export const FETCH_POLL_START = 'FETCH_POLL_START';
export const FETCH_POLL_SUCCESS = 'FETCH_POLL_SUCCESS';
export const FETCH_POLL_FAILED = 'FETCH_POLL_FAILED';
export const CHANGE_POLL_PROPERTY = 'POLL_CHANGE_PROPERTY';
export const SAVE_POLL_START = 'SAVE_POLL_START';
export const SAVE_POLL_SUCCESS = 'SAVE_POLL_SUCCESS';
export const SAVE_POLL_FAILED = 'SAVE_POLL_FAILED';
export const STEP_SET = 'STEP_SET';
export const UPDATE_POLL_START = 'UPDATE_POLL_START';

export function updatePollStart(data) {
    return {
        type: UPDATE_POLL_START,
        modifications: data
    };
}

export function savePollStart() {
    return {
        type: SAVE_POLL_START
    };
}

export function savePollSuccess(options) {
    return {
        type: SAVE_POLL_SUCCESS,
        options: options
    };
}

export function savePollFailed(reason) {
    return {
        type: SAVE_POLL_FAILED,
        reason: reason
    };
}

function requestPolls() {
    return {
        type: REQUEST_POLLS
    };
}

function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls
    };
}

function fetchAnswerStart(parent, poll) {
    return {
        type: FETCH_ANSWER_SUCCESS,
        parent: parent,
        poll
    };
}

function fetchAnswerSuccess(pollName, answers) {
    return {
        type: FETCH_ANSWER_SUCCESS,
        pollName: pollName,
        answers: answers
    };
}

function fetchAnswerFailed(pollName) {
    return {
        type: FETCH_ANSWER_START,
        pollName: pollName
    };
}

function fetchPollStart(pollName) {
    return {
        type: FETCH_POLL_START,
        pollName: pollName
    };
}

function fetchPollSuccess(poll) {
    return {
        type: FETCH_POLL_SUCCESS,
        poll: poll
    };
}

function fetchPollFailed(reason) {
    return {
        type: FETCH_POLL_FAILED,
        reason: reason
    };
}

function changeStepStart() {
    return {
        type: CHANGE_STEP_START
    };
}

function changeStepFinished() {
    return {
        type: CHANGE_STEP_FINISHED
    };
}

function changeStepFailed(reason) {
    return {
        type: CHANGE_STEP_FAILED,
        reason: reason
    };
}

export const setStep = (pollName, step) => {
    return {
        type: STEP_SET,
        pollName: pollName,
        step: step
    };
};

export function propertyChange(propertyName, value) {
    return {
        type: CHANGE_POLL_PROPERTY,
        propertyName: propertyName,
        newValue: value
    };
}

function isNotSuccessFullResponse(response) {
    return response.status !== 200;
}

export function changeStep(selectedPoll, selectedStep, stay, parent) {
    return function (dispatch) {
        dispatch(changeStepStart());

        return db.step.changeStep(parent, selectedPoll, selectedStep, stay)
            .then(response => {
                if (isNotSuccessFullResponse(response)) {
                    return dispatch(changeStepFailed());
                }
                dispatch(changeStepFinished());
            });
    };
}

function fetchPolls() {
    return function (dispatch) {
        dispatch(requestPolls());

        return db.poll.getPolls()
            .then(response => response.json())
            .then(mapProperties)
            .then(polls => dispatch(receivePolls(polls)));
    };
}

export function fetchAnswers(pollName) {
    return dispatch => {
        dispatch(fetchAnswerStart(pollName));

        return db.poll.getAnswers(pollName)
            .then(response => response.json())
            .then(answers => dispatch(fetchAnswerSuccess(pollName, answers)))
            .catch(error => dispatch(fetchAnswerFailed(error)));
    };
}

export function fetchPoll(pollName) {
    return dispatch => {
        dispatch(fetchPollStart(pollName));

        return db.poll.getPoll(pollName)
            .then(response => response.json())
            .then(poll => dispatch(fetchPollSuccess(poll)))
            .catch(error => dispatch(fetchPollFailed(error)));
    };
}

export function fetchPollsIfNeeded() {
    return dispatch => dispatch(fetchPolls());
}

export function savePoll(options) {
    return (dispatch, getState) => {
        var poll = getState().polls.poll;
        dispatch(savePollStart());

        return db.poll.savePoll(poll.name, poll.modifications)
            .then(() => dispatch(savePollSuccess(options)))
            .catch(error => dispatch(savePollFailed(error)));
    };
}

export function updatePoll(data, options) {
    return dispatch => {
        dispatch(updatePollStart(data));

        return dispatch(savePoll(options));
    };
}
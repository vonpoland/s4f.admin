import db from '../repositories/db';
import {getPath} from '../routing/routing';

export const REQUEST_POLLS = 'REQUEST_POLLS';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const CHANGE_STEP_START = 'CHANGE_STEP_START';
export const CHANGE_STEP_FAILED = 'CHANGE_STEP_FAILED';
export const CHANGE_STEP_FINISHED = 'CHANGE_STEP_FINISHED';
export const CHANGE_LOCATION = '@@router/LOCATION_CHANGE';
export const REQUEST_ANSWERS = 'REQUEST_ANSWERS';
export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS';
export const REQUEST_POLL = 'REQUEST_POLL';
export const RECEIVE_POLL = 'RECEIVE_POLL';

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


function requestAnswers(parent, poll) {
    return {
        type: REQUEST_ANSWERS,
        parent: parent,
        poll
    };
}

function receiveAnswers(pollName, answers) {
    return {
        type: RECEIVE_ANSWERS,
        pollName: pollName,
        answers: answers
    };
}

function requestPoll(pollName) {
    return {
        type: REQUEST_POLL,
        pollName: pollName
    };
}

function receivePoll(poll) {
    return {
        type: RECEIVE_POLL,
        poll: poll
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

function isNotSuccessFullResponse(response) {
    return response.status !== 200;
}

export function changeStep(selectedPoll, selectedStep, stay, parent = 'tychy') {
    return function (dispatch) {
        dispatch(changeStepStart());

        return db.step.changeStep(parent, selectedPoll, selectedStep, stay)
            .then(response => {
                if(isNotSuccessFullResponse(response)) {
                    return dispatch(changeStepFailed());
                }
                dispatch(changeStepFinished());
            });
    };
}

function fetchPolls(parent) {
    return function(dispatch) {
        dispatch(requestPolls());

        return db.poll.getPolls(parent)
            .then(response => response.json())
            .then(polls => dispatch(receivePolls(polls)));
    };
}

export function fetchAnswers(pollName) {
    return dispatch => {
        dispatch(requestAnswers(pollName));

        return db.poll.getAnswers(pollName)
            .then(response => response.json())
            .then(answers => dispatch(receiveAnswers(pollName, answers)));
    };
}

export function fetchPoll(pollName) {
    return dispatch => {
        dispatch(requestPoll(pollName));

        return db.poll.getPoll(pollName)
            .then(response => response.json())
            .then(poll => dispatch(receivePoll(poll)));
    };
}

export function fetchPollsIfNeeded() {
    return (dispatch, getState) => {
        let parent = getPath(getState().routing.locationBeforeTransitions).parent;

        return dispatch(fetchPolls(parent));
    };
}
import fetch from 'isomorphic-fetch';

export const getPolls = parent => fetch('api/poll?parent=' + parent);
export const changeStep = (parent, pollName, step, stay) => fetch(`api/poll/${parent}/screen`, {
    method: 'POST',
    headers: {
      Authorization: window.auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({pollName: pollName, step: step, stay: stay})
});
export const getAnswers = pollName => fetch(`api/poll/${pollName}/answer`, {
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    }
});

export const getPoll = pollName => fetch(`api/poll/${pollName}`, {
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    }
});


const db = {
    poll: {getPolls, getAnswers, getPoll},
    step: {changeStep}
};
export default db;
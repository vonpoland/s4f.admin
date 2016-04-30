import fetch from 'isomorphic-fetch';

const getPolls = parent => fetch('api/poll?parent=' + parent, { credentials: 'same-origin'});

const changeStep = (parent, pollName, step, stay) => fetch(`/admin/api/poll/${parent}/screen`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({pollName: pollName, step: step, stay: stay})
});
const getAnswers = pollName => fetch(`/admin/api/poll/${pollName}/answer`, {
    headers: {
        'Content-Type': 'application/json'
    }
});

const getPoll = pollName => fetch(`/admin/api/poll/${pollName}`, {
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    }
});

const login = (user, password) => fetch('/admin/api/auth/login', {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: user, password: password})
});

const loggedUser = () => fetch('/admin/api/auth/me', {
    credentials: 'same-origin'
});

//const login = (user, password) => $.ajax({
//    type: 'POST',
//    url: '/admin/api/auth/login',
//    contentType: "application/json",
//    data: JSON.stringify({username: user, password: password}),
//    dataType: 'json'
//});

const db = {
    poll: {getPolls, getAnswers, getPoll},
    step: {changeStep},
    auth: {login, loggedUser}
};
export default db;
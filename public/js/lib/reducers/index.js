import { combineReducers } from 'redux';
import polls from './polls';
import step from './step';
import { routerReducer } from 'react-router-redux';

const todoApp = combineReducers({
    step,
    polls,
    routing : routerReducer
});

export default todoApp;
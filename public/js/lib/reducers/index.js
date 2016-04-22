import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import polls from './polls';
import step from './step';
import { routerReducer } from 'react-router-redux';

const todoApp = combineReducers({
    step,
    todos,
    visibilityFilter,
    polls,
    routing : routerReducer
});

export default todoApp;
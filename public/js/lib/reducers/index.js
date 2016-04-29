import { combineReducers } from 'redux';
import polls from './polls';
import step from './step';
import { routerReducer } from 'react-router-redux';

const indexApp = combineReducers({
    step,
    polls,
    routing : routerReducer
});

export default indexApp;
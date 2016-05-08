import { combineReducers } from 'redux';
import polls from './polls';
import step from './step';
import { routerReducer } from 'react-router-redux';
import authReducer from '../auth/reducer';
import navigationReducer from '../navigation/reducer';

const indexApp = combineReducers({
    authData: authReducer,
    navigation: navigationReducer,
    step,
    polls,
    routing : routerReducer
});

export default indexApp;
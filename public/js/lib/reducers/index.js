import { combineReducers } from 'redux';
import polls from './polls';
import step from './step';
import { routerReducer } from 'react-router-redux';
import authReducer from '../auth/reducer';
import navigationReducer from '../navigation/reducer';
import dashboardReducer from '../dashboard/reducer';

const indexApp = combineReducers({
    authData: authReducer,
    navigation: navigationReducer,
    dashboard: dashboardReducer,
    step,
    polls,
    routing : routerReducer
});

export default indexApp;
import { combineReducers } from 'redux';
import polls from '../poll/reducer';
import step from './step';
import { routerReducer } from 'react-router-redux';
import authReducer from '../auth/reducer';
import navigationReducer from '../navigation/reducer';
import dashboardReducer from '../dashboard/reducer';

function config() {
    return {
        projectorUrl: window.bigscreenConfig.frontendConfig.projectorUrl,
        mobileUrl: window.bigscreenConfig.bigscreenChannel
    };
}

const indexApp = combineReducers({
    authData: authReducer,
    navigation: navigationReducer,
    dashboard: dashboardReducer,
    step,
    polls,
    config,
    routing: routerReducer
});

export default indexApp;
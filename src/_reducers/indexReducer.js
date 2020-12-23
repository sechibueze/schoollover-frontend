import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import BudgetReducer from './BudgetReducer';
import ProjectReducer from './ProjectReducer';

export default combineReducers({
    auth: AuthReducer,
    alerts: AlertReducer,
    project: ProjectReducer,
    budget: BudgetReducer
    
});
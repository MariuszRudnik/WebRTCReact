import { combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer.ts';

export default combineReducers({
  dashboard: dashboardReducer
});

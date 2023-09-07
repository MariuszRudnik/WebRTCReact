import { combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer.ts';
import callReducer from './reducers/callReducer.ts';

export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer
});

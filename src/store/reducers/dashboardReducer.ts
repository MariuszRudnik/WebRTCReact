import * as dashboardActions from '../actions/dashboardActions.ts';

const initState = {
  username: ''
};
const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
};
export default reducer;

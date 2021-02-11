import {
  combineReducers
} from 'redux';

function authReducer(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  auth: authReducer
});
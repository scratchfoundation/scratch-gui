const initialState = {
  user: null
};

const SET_USER_SESSION = 'SET_USER_SESSION';
const SET_SESSION_DATA = 'SET_SESSION_DATA';

export const setUserSession = (user) => ({
  type: SET_USER_SESSION,
  user
});

export const setSessionData = (sessionData) => ({
  type: SET_SESSION_DATA,
  sessionData
});

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SESSION:
      return {
        ...state,
        user: action.user
      };
    case SET_SESSION_DATA:
      return {
        ...state,
        ...action.sessionData
      };
    default:
      return state;
  }
};

export default sessionReducer;

const initialState = {
    user: null
  };
  
  const SET_USER_SESSION = 'SET_USER_SESSION';
  
  export const setUserSession = (user) => ({
    type: SET_USER_SESSION,
    user
  });
  
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_SESSION:
        return {
          ...state,
          user: action.user
        };
      default:
        return state;
    }
  };
  
  export default sessionReducer;
  
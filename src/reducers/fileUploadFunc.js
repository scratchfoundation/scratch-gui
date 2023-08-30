

const initialState = {
  passedFunction: null,
};

const fileUploadFunc = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FUNCTION":
      return {
        ...state,
        passedFunction: action.payload,
      };
    default:
      return state;
  }
};

export default fileUploadFunc;
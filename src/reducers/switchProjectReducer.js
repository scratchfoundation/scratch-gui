const initialState = {
  switchState: false
};

const switchProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATE_TO_ONE":
      return { 
        switchState: action.payload 
      };
      case "UPDATE_STATE_TO_FALSE":
      return { 
        switchState: action.payload 
      };

    default:
      return state;
  }
};

export default switchProjectReducer;
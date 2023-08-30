const initialState = { isToggled: false };

const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isToggled: true };
      case "SWITCHTOGGLE":
      return { ...state, isToggled: false };
    default:
      return state;
  }
};

export default toggleReducer;
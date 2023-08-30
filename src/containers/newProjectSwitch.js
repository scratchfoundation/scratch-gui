// actions.js

const UPDATE_STATE_TO_ONE = 'UPDATE_STATE_TO_ONE'
const UPDATE_STATE_TO_FALSE = 'UPDATE_STATE_TO_FALSE'

export const updateStateToOne = (stateUp) => {
    return {
      type: UPDATE_STATE_TO_ONE,
      payload: stateUp,
    };
  };
  

  export const updateStateTofalse = (stateDown) => {
    return {
      type: UPDATE_STATE_TO_FALSE,
      payload: stateDown,
    };
  };
 
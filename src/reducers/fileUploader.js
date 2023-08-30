
const initialState = {
    fileProject: [],
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FILE_UPLOAD':
        return {
            fileProject: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default fileReducer;
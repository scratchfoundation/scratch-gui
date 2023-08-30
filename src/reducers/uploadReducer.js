
const initialState = {
    
    items: [],
  };
  
  const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_UPLOAD':
        return {
          items: action.payload,
        };
      
      default:
        return state;                                                                       
    }
  };
  
  export default uploadReducer;
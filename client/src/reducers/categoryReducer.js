const initialState = [];

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY": {
      return [...state, action.payload];
    }
    case "GET_CATEGORIES": {
      return [...action.payload];
    }
    case "DELETE_CATEGORY": {
      const newState = state.filter(
        (category) => category._id !== action.payload._id
      );
      return [...newState];
    }
    case "CLEAR_CATEGORIES": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;

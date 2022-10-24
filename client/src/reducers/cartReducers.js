const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CART": {
      return [...state, action.payload];
    }
    case "GET_CART": {
      return [...action.payload];
    }
    case "DELETE_CART": {
      return state.filter((cart) => {
        return cart._id !== action.payload._id;
      });
    }
    case "CLEAR_CART": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;

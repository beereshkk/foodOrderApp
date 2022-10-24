const initialState = [];

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_DISHES": {
      return [...state, action.payload];
    }
    case "GET_DISHES": {
      return [...action.payload];
    }
    case "DELETE_DISH": {
      const newState = state.filter((dishes) => {
        return dishes._id !== action.payload._id;
      });
      return newState;
    }
    case "CLEAR_DISHES": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default dishesReducer;

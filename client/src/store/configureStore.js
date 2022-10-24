import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import categoryReducer from "../reducers/categoryReducer";
import dishesReducer from "../reducers/dishesReducer";
import cartReducer from "../reducers/cartReducers";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      category: categoryReducer,
      dishes: dishesReducer,
      cart: cartReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;

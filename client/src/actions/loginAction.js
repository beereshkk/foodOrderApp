import axios from "axios";
import { clearCart, startGetCart } from "./cartAction";
import { clearDishes, startGetDishes } from "./dishesAction";
import { clearCategories, startGetCategories } from "./categoriesAction";

export const startLogin = (loginData, clearInput, redirect, setFormIssues) => {
  return (dispatch) => {
    axios.post("http://localhost:3089/users/login", loginData).then((res) => {
      console.log(res.data);
      if (res.data.hasOwnProperty("token")) {
        localStorage.setItem("jwtToken", JSON.stringify(res.data));
        dispatch(loginUser(res.data));
        dispatch(startGetCategories(res.data));
        dispatch(startGetCart(res.data));
        dispatch(startGetDishes(res.data));
        clearInput();
        redirect();
      } else {
        console.log("not Found");
        setFormIssues();
      }
    });
  };
};

const loginUser = (jwtToken) => {
  console.log("inside Action", jwtToken);
  return {
    type: "USER_LOGIN",
    payload: jwtToken,
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    dispatch(userlogout());
    dispatch(clearCart());
    dispatch(clearDishes());
    dispatch(clearCategories());
  };
};

const userlogout = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const startGEtUser = () => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      dispatch(getUser(token));
    }
  };
};

const getUser = (token) => {
  return {
    type: "GET_USER",
    payload: token,
  };
};

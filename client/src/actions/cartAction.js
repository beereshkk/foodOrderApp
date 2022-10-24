import axios from "axios";

export const startCreateCart = (cart, jwtToken) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3089/cart", cart, {
        headers: {
          Authorization: jwtToken.token,
        },
      })
      .then((res) => {
        const cartData = res.data;
        dispatch(createCart(cartData));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const createCart = (cartData) => {
  return { type: "CREATE_CART", payload: cartData };
};

export const startGetCart = (token) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3089/cart", {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        const carts = res.data;
        dispatch(getCart(carts));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const getCart = (carts) => {
  return {
    type: "GET_CART",
    payload: carts,
  };
};

export const startDeleteCart = (id, token) => {
  console.log("hi cart");
  return (dispatch) => {
    axios
      .delete(`http://localhost:3089/cart/${id}`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        alert("succes");
        const cart = res.data;
        console.log("del cart", cart);
        dispatch(deleteCart(cart));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const deleteCart = (cart) => {
  return {
    type: "DELETE_CART",
    payload: cart,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_BUDGET",
  };
};

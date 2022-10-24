import axios from "axios";

export const startCreateDishes = (dishes, jwtToken, clearinputs, redirect) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3089/dishes", dishes, {
        headers: {
          Authorization: jwtToken.token,
        },
      })
      .then((dishes) => {
        console.log("dose", dishes.data);
        dispatch(createDishes(dishes.data));
        clearinputs();
        redirect();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const createDishes = (dishes) => {
  return {
    type: "CREATE_DISHES",
    payload: dishes,
  };
};

export const startGetDishes = (jwtToken) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3089/dishes", {
        headers: {
          Authorization: jwtToken.token,
        },
      })
      .then((res) => {
        console.log("dishes", res.data);
        const dishes = res.data;
        dispatch(getDishes(dishes));
      });
  };
};

const getDishes = (dishes) => {
  return {
    type: "GET_DISHES",
    payload: dishes,
  };
};

export const startDeleteDishes = (id, token) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3089/dishes/${id}`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        alert("succes");
        const dishes = res.data;
        dispatch(deleteDish(dishes));
      });
  };
};
const deleteDish = (dishes) => {
  return {
    type: "DELETE_DISH",
    payload: dishes,
  };
};

export const clearDishes = () => {
  return {
    type: "CLEAR_DISHES",
  };
};

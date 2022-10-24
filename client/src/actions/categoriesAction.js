import axios from "axios";

export const startCreateCategory = (category, jwtToken) => {
  return (dispatch) => {
    console.log("cat Action");
    axios
      .post("http://localhost:3089/category", category, {
        headers: {
          Authorization: jwtToken.token,
        },
      })
      .then((res) => {
        const categoryData = res.data;
        console.log("insertes Category", categoryData);
        dispatch(createCategory(categoryData));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

const createCategory = (categoryData) => {
  return {
    type: "CREATE_CATEGORY",
    payload: categoryData,
  };
};

export const startGetCategories = (token) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3089/category", {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        console.log("get cat", res.data);
        const categories = res.data;
        dispatch(getCategories(categories));
      });
  };
};

const getCategories = (categories) => {
  return {
    type: "GET_CATEGORIES",
    payload: categories,
  };
};

export const startDeleteCategory = (id, token) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3089/category/${id}`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        const category = res.data.category;
        dispatch(deleteCategory(category));
      });
  };
};

const deleteCategory = (category) => {
  return {
    type: "DELETE_CATEGORY",
    payload: category,
  };
};

export const clearCategories = () => {
  return {
    type: "CLEAR_CATEGORIES",
  };
};

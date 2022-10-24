import axios from "axios";

export const startRegister = (registerData, clearInput, redirect) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3089/users/register", registerData)
      .then((res) => {
        console.log(res.data);
        clearInput();
        redirect();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

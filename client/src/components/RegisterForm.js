import React, { useState } from "react";
import { startRegister } from "../actions/registerAction";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import validator from "validator";
import swal from "sweetalert";

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const errors = {};
  const handleChange = (e) => {
    let attr = e.target.name;
    if (attr === "name") {
      setUserName(e.target.value);
    } else if (attr === "email") {
      setEmail(e.target.value);
    } else if (attr === "password") {
      setPassword(e.target.value);
    }
  };

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const redirect = () => {
    swal("Registration successful!", "Redirecting to login page", "success");
    props.history.push("/login");
  };

  const runValidators = () => {
    if (email.length == 0) {
      errors.emailError = "Email cannot be empty";
    } else if (!validator.isEmail(email)) {
      errors.emailError = "Invalid Email format";
    }
    if (password.length == 0) {
      errors.passwordError = "Password cannot be empty";
    }
    if (password.length > 0 && password.length < 5) {
      errors.passwordError =
        "Password is too short. Length must be greater than 5.";
    }
    console.log(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidators();
    if (Object.keys(errors).length == 0) {
      console.log("validation successful");
      setFormErrors({});
      const formData = {
        username: username,
        email: email,
        password: password,
      };
      console.log("formData", formData);
      dispatch(startRegister(formData, clearInput, redirect));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="registerPage">
      <center>
        <h1>Register for Order Your food</h1>
      </center>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          value={username}
          name="name"
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Enter a valid email address"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <br />
        {formErrors.emailError && (
          <p style={{ color: "red" }}>{formErrors.emailError}</p>
        )}
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Create a password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <br />
        {formErrors.passwordError && (
          <p style={{ color: "red" }}>{formErrors.passwordError}</p>
        )}
        <br />
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;

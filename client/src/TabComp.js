import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, Route, Switch, withRouter } from "react-router-dom";
import { Tab, Tabs, AppBar, Button } from "@material-ui/core";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Dishes from "./components/Dishes";
import Cart from "./components/Cart";
import { startLogout } from "./actions/loginAction";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

const TabComp = (props) => {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState("");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3089/users/account", {
          headers: {
            Authorization: token.token,
          },
        })
        .then((res) => {
          const result = res.data;
          console.log("admin", res.data);
          setAdmin(result.isAdmin);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  const handleLogOut = () => {
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      confirmButtonText: "Yes, I am sure!",
      cancelButtonText: "No, cancel it!",
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        console.log("Log out");
        dispatch(startLogout());
        props.history.replace("/login");
      } else {
      }
    });
  };

  return (
    <div>
      <center>
        <h1 className="mainHeading">Expense App</h1>
      </center>

      <Route
        path="/"
        render={(history) => (
          <AppBar>
            <Tabs
              value={
                history.location.pathname !== "/"
                  ? history.location.pathname
                  : false
              }
            >
              {console.log("history", history.location.pathname)}
              {!token ? (
                <Tab
                  label="Register"
                  value="/register"
                  component={Link}
                  to="/register"
                />
              ) : (
                <Tab label="Home" value="/home" component={Link} to="/home" />
              )}
              {!token ? (
                <Tab
                  label="Login"
                  value="/login"
                  component={Link}
                  to="/login"
                />
              ) : (
                <div>
                  <Tab
                    label="Categories"
                    value="/categories"
                    to="/categories"
                    component={Link}
                  />{" "}
                  <Tab label="Cart" value="/cart" to="/cart" component={Link} />
                  {admin && (
                    <Tab
                      label="admin"
                      value="/admin"
                      to="/admin"
                      component={Link}
                    />
                  )}
                  <Button style={{ color: "yellow" }} onClick={handleLogOut}>
                    Logout
                  </Button>
                </div>
              )}
            </Tabs>
          </AppBar>
        )}
      />

      <Switch>
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/admin" component={Admin} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/categories" component={Categories} exact={true} />
        <Route path="/dishes" component={Dishes} exact={true} />
        <Route path="/cart" component={Cart} exact={true} />
      </Switch>
    </div>
  );
};

export default withRouter(React.memo(TabComp));

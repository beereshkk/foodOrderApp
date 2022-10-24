import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap-icons/font/bootstrap-icons.css";
import { startCreateCart } from "../actions/cartAction";
import { startDeleteDishes } from "../actions/dishesAction";

const Dishes = (props) => {
  const [admin, setAdmin] = useState("");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const category = useLocation().state.stateparam;
  console.log("category", category);
  const dispatch = useDispatch();

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

          setAdmin(result.isAdmin);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  const Dishes = useSelector((state) => {
    return state.dishes;
  });

  const [filteredDishes, setFilteredDishes] = useState([]);

  useEffect(() => {
    const result = Dishes.filter((ele) => {
      return ele.categoryID == category;
    });
    setFilteredDishes(result);
  }, [Dishes]);

  console.log("filter", filteredDishes);

  const handleAddCart = (id) => {
    const result = filteredDishes.filter((ele) => ele._id === id);
    dispatch(startCreateCart(...result, token));
  };

  const handleRemove = (id) => {
    dispatch(startDeleteDishes(id, token));
  };
  return (
    <div>
      <div className="projects">
        <h2 className="heading">Looking for great food near for you</h2>

        <p></p>
        <div className="wrapper">
          {Dishes.filter((ele) => {
            return ele.categoryID == category;
          }).map((item) => {
            return (
              <div>
                <Card style={{ width: "18rem" }} className="list-group-item">
                  <Card.Img variant="top" src={item.imageUrl} height={200} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text style={{ color: "blue" }}>
                      $ {item.price}.00
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleAddCart(item._id);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <br />
                    {admin && (
                      <button
                        style={{ padding: "5px" }}
                        onClick={() => {
                          handleRemove(item._id);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dishes;

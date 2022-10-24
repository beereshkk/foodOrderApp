import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-image-resizer";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { startDeleteCart } from "../actions/cartAction";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [userId, setUserId] = useState("");
  const [total, setTotal] = useState(0);

  const handleRemoveCart = (id) => {
    dispatch(startDeleteCart(id, token));
  };

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
          setUserId(result._id);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  useEffect(() => {
    let cartAmount = 0;
    cart.forEach((ele) => {
      return (cartAmount += Number(ele.price));
    });
    setTotal(cartAmount);
  }, [cart]);

  return (
    <div>
      <div className="orders">
        {!cart.length && (
          <img
            className="cartimage"
            src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
            alt=""
            style={{ border: "5px solid black" }}
          />
        )}
        <Card border="primary" style={{ border: "5px solid black" }}>
          <Card.Body>
            <Card.Title>SubTotal: ${total}</Card.Title>

            <Button variant="primary">CHECKOUT</Button>
            <br />
          </Card.Body>
        </Card>
        <h2 className="heading">YOUR CART....</h2>
        <div className="wrapper">
          {cart
            .filter((ele) => {
              return ele.userId == userId;
            })
            .map((item) => {
              return (
                <div>
                  <Card style={{ width: "20rem", fontFamily: "Arial" }}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <p style={{ color: "red" }}>${item.price}.00</p>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleRemoveCart(item._id);
                        }}
                      >
                        remove
                      </Button>
                      <br />
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

export default Cart;

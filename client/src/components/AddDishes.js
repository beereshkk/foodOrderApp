import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { startCreateDishes } from "../actions/dishesAction";
import swal from "sweetalert";

function AddDishes() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [name, setName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const categories = useSelector((state) => {
    return state.category;
  });

  const [categoriesList, setCategoriesList] = useState([...categories] || []);

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "imageUrl") {
      setImageUrl(e.target.value);
    }
  };
  const handleSelect = (e) => {
    console.log(e.target.value);
    setCategoryID(e.target.value);
  };

  const clearinputs = () => {
    setName("");
    setPrice("");
    setImageUrl("");
    setCategoryID("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dishData = {
      name: name,
      price: price,
      categoryID: categoryID,
      imageUrl: imageUrl,
    };
    const redirect = () => {
      swal("Dish Added Succesfully");
    };
    dispatch(startCreateDishes(dishData, token, clearinputs, redirect));
  };

  return (
    <div className="addCategory">
      <Form className="form" onSubmit={handleSubmit}>
        <h2>Add Dishes</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dish Name</Form.Label>
          <Form.Control
            type="Name"
            placeholder="Enter Dish Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={price}
            placeholder="Enter Price"
            onChange={handleChange}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ImageURL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={imageUrl}
            placeholder="Enter ImageURL"
            onChange={handleChange}
          />
        </Form.Group>
        <select className="form-select" onChange={handleSelect}>
          <br />
          <option value="select category">Choose Category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        <Button variant="primary" type="submit">
          Add Dish
        </Button>
      </Form>
    </div>
  );
}

export default AddDishes;

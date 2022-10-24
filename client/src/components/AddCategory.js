import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { startCreateCategory } from "../actions/categoriesAction";

function AddCategory() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "imageUrl") {
      setImageUrl(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const catData = {
      name: name,
      imageUrl: imageUrl,
    };
    console.log("catData", catData);
    dispatch(startCreateCategory(catData, token));
  };

  return (
    <div className="addCategory">
      <Form className="form" onSubmit={handleSubmit}>
        <h2>Add Category</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Name"
            placeholder="Enter Category Name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
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

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </div>
  );
}

export default AddCategory;

import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Categories = (props) => {
  const category = useSelector((state) => {
    return state.category;
  });
  const [categories, setCategories] = useState(category || []);
  return (
    <div>
      <div className="projects">
        <h2 className="heading">Looking for great food near for you</h2>
        <p></p>
        <div className="wrapper">
          {categories.map((item) => {
            return (
              <div>
                <Link
                  to={{
                    pathname: "/dishes",
                    state: { stateparam: item.name },
                  }}
                >
                  <Card style={{ width: "18rem" }} className="list-group-item">
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                    <Card.Img
                      variant="top"
                      src={item.imageUrl}
                      height={200}
                      width={200}
                    />
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;

import "./App.css";
import { useDispatch } from "react-redux";
import { startGetCategories } from "./actions/categoriesAction";
import { startGetDishes } from "./actions/dishesAction";
import { startGetCart } from "./actions/cartAction";
import TabComp from "./TabComp";
import { useEffect } from "react";

function App(props) {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (token) {
      dispatch(startGetCategories(token));
      dispatch(startGetDishes(token));
      dispatch(startGetCart(token));
    } else {
    }
  });

  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage:
      "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-food-western-food-simple-poster-background-image_25130.jpg",
  };
  return (
    <div>
      <TabComp style={sectionStyle} />
    </div>
  );
}

export default App;

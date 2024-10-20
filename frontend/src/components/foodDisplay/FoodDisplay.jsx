import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";
import "./foodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Ensure 'food_list' is an array and has valid data
  if (!Array.isArray(food_list)) {
    console.error("food_list is not an array");
    return null;
  }

  // Filter the food_list based on the selected category
  const filteredFoodList = food_list.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;

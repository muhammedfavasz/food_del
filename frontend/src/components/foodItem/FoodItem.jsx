import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./fooditem.css";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeCart,url } = useContext(StoreContext);

  // Construct the image URL
  const imageUrl = `${url}images/${image}`;

  // Debug: Log the image URL to ensure it's correct
  // console.log("Image URL:", imageUrl);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={imageUrl} className="food-item-image" alt={`${name}`} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeCart(id)}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

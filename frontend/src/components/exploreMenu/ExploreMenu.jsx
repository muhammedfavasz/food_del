import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Menu</h1>
      <p className="explore-menu-text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
        perspiciatis nam ducimus asperiores maxime ullam voluptatum dolor
        officiis.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(prevCategory => prevCategory === item.menu_name ? "All" : item.menu_name)
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

import { useState, useEffect } from "react"; // Import necessary hooks from React
import "./list.css"; // Import CSS for styling
import axios from "axios"; // Import Axios for HTTP requests
import { toast } from "react-toastify"; // Import Toast for notifications

const List = ({ url }) => {
  // Define the List component and accept `url` as a prop
  const [list, setList] = useState([]); // State to store the list of food items

  // Function to fetch the list of food items from the server
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`); // Fetch data from the backend
      if (response.data.success) {
        setList(response.data.data); // Update the state with the fetched list
      } else {
        toast.error("Error fetching the list"); // Show an error notification if the fetch fails
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
      toast.error("Failed to fetch the list"); // Show an error notification
    }
  };

  // Function to remove a food item from the list
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId }); // Send a POST request to remove the item
    await fetchList(); // Re-fetch the list after removing the item
    if (response.data.success) {
      toast.success(response.data.message); // Show a success notification if the removal is successful
    } else {
      toast.error("Error"); // Show an error notification if the removal fails
    }
  };

  // useEffect hook to fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p> {/* Header for the list */}
      <div className="list-table">
        <div className="list-table-format title">
          {/* Table headers */}
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Map over the list and display each food item */}
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" /> {/* Display image */}
              <p>{item.name}</p> {/* Display name */}
              <p>{item.category}</p> {/* Display category */}
              <p>${item.price}</p> {/* Display price */}
              {/* Action to remove the item */}
              <p onClick={() => removeFood(item._id)} className="cursor">x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;

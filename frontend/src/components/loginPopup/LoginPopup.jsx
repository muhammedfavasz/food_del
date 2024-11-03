import { useContext, useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

const onLogin = async (event) => {
   event.preventDefault();
   console.log("Form submitted"); // Check if form submission is working

   const endpoint = currentState === "Login" ? "login" : "register";
   const newUrl = `${url}api/user/${endpoint}`;
   
   console.log("Endpoint:", endpoint); // Check endpoint selection
   console.log("URL:", newUrl); // Verify constructed URL
   console.log("Data:", data); // Log data being sent in the request

   try {
      const response = await axios.post(newUrl, data);
      console.log("Response:", response); // Log response to see if request was successful
      if (response.data.success) {
         setToken(response.data.token);
         localStorage.setItem("token", response.data.token);
         toast.success("Success!");
         setShowLogin(false);
      } else {
         toast.error(response.data.message);
      }
   } catch (error) {
      console.error("Error in axios request:", error); // Catch any errors from axios
      toast.error("An error occurred. Please try again.");
   }
};


  console.log("Token stored:", localStorage.getItem("token"));

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <button type="submit">
          {currentState === "sign up" ? "Create account" : "Login"}
        </button>
        <div>
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

import { useContext, useEffect, useState } from "react";
import "./PlaceOder.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOder = () => {
  const { getTotalCartAmount, food_list, url, token, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // ADD: Payment method state to handle the selected method
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // Stripe is default

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ADD: Handle the payment method change (COD or Stripe)
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] }; // Include quantity in itemInfo
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery charge (2 units)
      paymentMethod, // ADD: Send the selected payment method
    };

    try {
      // CONDITIONAL PAYMENT FLOW:
      if (paymentMethod === "stripe") {
        // Stripe Payment Flow
        let response = await axios.post(url + "api/order/place", orderData, {
          headers: { token },
        });

        if (response.data.success) {
          const { session_url } = response.data;
          window.location.href = session_url; // Redirect user to Stripe Checkout page
        } else {
          alert("Error: Payment session creation failed");
        }
      } else if (paymentMethod === "cod") {
        // COD Payment Flow
        let response = await axios.post(url + "api/order/cod", orderData, {
          headers: { token },
        });

        if (response.data.success) {
          toast.success(
            "Order placed successfully. Payment will be collected on delivery."
          );
          navigate("/myorders"); // Redirect to order history
        } else {
          alert("Error placing order.");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="email"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="street"
          placeholder="Street"
          value={data.street}
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={data.zipCode}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          {/* ADD: Payment method selector */}
          <div className="payment-method">
            <label>Select Payment Method:</label>
            <select value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="stripe">Stripe (Credit/Debit Card)</option>
              <option value="cod">Cash on Delivery (COD)</option>
            </select>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOder;

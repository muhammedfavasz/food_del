import { useNavigate, useSearchParams } from "react-router-dom";
import "./verify.css";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams(); // Removed 'setSearchPaeams' (typo)
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      navigate("/"); // Redirect in case of error as well
    }
  };

  useEffect(() => {
    verifyPayment(); // Call the function inside useEffect
  }, []); // Empty dependency array to run only once

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;

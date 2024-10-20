import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOder from "./pages/placeOder/PlaceOder";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/loginPopup/LoginPopup";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
const App = () => {
  const [showlogin, setShowLogin] = useState(false);
  return (
    <>
      {showlogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

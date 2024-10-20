import './navbar.css'
import assets from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className='logo' src={assets.logo} alt="Logo" />
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;

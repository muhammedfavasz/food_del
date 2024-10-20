import { assets } from "../../assets/assets";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vitae
            nihil illum quia autem, quo sit porro soluta quis iure magni
            laboriosam rem! Itaque incidunt vel est, pariatur ullam minima?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privecy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 9847 31 1609</li>
            <li>muhammedfavas1609@gmail.com</li>
          </ul>
        </div>
      </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2024 © tomato.co - All Right Recived.
        </p>
    </div>
  );
};

export default Footer;

import { useState } from 'react';
import { LOGO_URL } from '../utils/constants';

const Header = () => {
  let [btnName, setBtnName] = useState("Login");
  console.log('rendering...');

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}
          alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button className="login" onClick={() => btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")}>{btnName}</button>
        </ul>
      </div>
    </div>
  );
}

export default Header;
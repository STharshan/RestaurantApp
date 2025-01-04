import React, { useContext, useState } from "react";
import './navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({setShowLogin}) {

  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken}= useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobileapp</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="search" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" className="basket"/></Link>
            <div className={getTotalCartAmount()?"dot":""}></div> 
         </div> 
         {!token?<button className="navbar-button" onClick={()=>setShowLogin(true)}>sign in</button>
           :<div className="navbar-profile">
              <img src={assets.profile_icon} alt=""/>
              <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
              </ul>
            </div> 
          }
         
      </div>
    </div>
  );
}

export default Navbar;
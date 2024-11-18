import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";
import './css/header.css';
import { Link } from 'react-router-dom';
import { IoAirplane } from "react-icons/io5";
import { IoIosBed } from "react-icons/io";
import { MdFavorite } from "react-icons/md";

const Header = () =>{
    return(
        <div className="header-box" >
            <div className="features">
            <Link to="/flight-search">
                <h3 className="find">
                    <IoAirplane className="airplane-icon"/>Find Flight
                </h3>
            </Link>
            <Link to="/list-accommodation">
                <h3 className="find">
                    <IoIosBed className="bed-icon"/> Find Stays
                </h3>
            </Link>
            </div>
            <Logo/>
            <div className="account-details">
                <Link to ="/Favorites">
                    <h3 className="favorites"><MdFavorite className="favorites-icon" />Favorites  | </h3>
                </Link>
                <Link to ="/customerProfile">
                <h3 className="user"><AiOutlineUser className="user-icon"/> Vince K.</h3>
                </Link>
               
            </div>
        </div>
    );

;}
export default Header;

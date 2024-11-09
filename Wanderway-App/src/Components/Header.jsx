import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";
import './css/header.css';
import { IoAirplane } from "react-icons/io5";
import { IoIosBed } from "react-icons/io";

const Header = () =>{
    return(
        <div className="header-box" >
            <div className="features">
                <h3 className="find"><IoAirplane className="airplane-icon"/>Find Places</h3>
                <h3 className="find"><IoIosBed className="bed-icon"/> Find Stays</h3>
            </div>
            <Logo/>
            <div className="account-details">
                <h2><AiOutlineUser className="user-icon"/> placeholder</h2>
                
            </div>
        </div>
    );

;}
export default Header;

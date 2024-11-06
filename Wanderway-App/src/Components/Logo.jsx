import React from "react";
import { Link } from "react-router-dom";
import LogoIMG from '../assets/LogoIMG.png'

const Logo =() => {
    return(
        <Link to="/">
            <img src ={LogoIMG} alt="Logo" style={{ width: '200px', height: '50px' }}/>
        </Link>
    );
};

export default Logo
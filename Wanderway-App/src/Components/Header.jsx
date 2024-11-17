import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";
import { IoIosBed } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import Logo from './Logo'; 
import styles from './CSS/header.module.css';
import './CSS/header.css'
const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.headerBox}>
      <div className={styles.features}>
        <Link to="/list-flight">
          <h3 className={`${styles.find} ${location.pathname === '/list-flight' ? styles.active : ''}`}>
            <IoAirplane className={styles.airplaneIcon} />Find Places
          </h3>
        </Link>
        <Link to="/hotelsearch">
          <h3 className={`${styles.find} ${location.pathname === '/hotelsearch' ? styles.active : ''}`}>
            <IoIosBed className={styles.bedIcon} /> Find Stays
          </h3>
        </Link>
      </div>
      <Logo />
      <div className={styles.accountDetails}>
        <Link to="/Favorites">
          <h3 className={styles.favorites}><MdFavorite className={styles.favoritesIcon} />Favorites  | </h3>
        </Link>
        <Link to="/customerProfile">
          <h3 className={styles.user}><AiOutlineUser className={styles.userIcon} /> Vince K.</h3>
        </Link>
      </div>
    </div>
  );
};

export default Header;

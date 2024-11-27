import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoAirplane } from "react-icons/io5";
import { IoIosBed } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import styles from './css/header.module.css';

const Header = () => {
    return (
      <div className={styles.headerBox}>
        <div className={styles.features}>
          <Link to="/flight-search">
            <h5 className={styles.find}>
              <IoAirplane className={styles.airplaneIcon} /> Find Flight
            </h5>
          </Link>
          <Link to="/list-accommodation">
            <h5 className={styles.find}>
              <IoIosBed className={styles.bedIcon} /> Find Stays
            </h5>
          </Link>
        </div>
        <Logo />
        <div className={styles.accountDetails}>
          <Link to="/Favorites">
            <h5 className={styles.favorites}>
              <MdFavorite className={styles.favoritesIcon} /> Favorites |
            </h5>
          </Link>
          <Link to="/customerProfile">
            <h5 className={styles.user}>
              <AiOutlineUser className={styles.userIcon} /> Vince K.
            </h5>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Header;
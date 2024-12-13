import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineUser } from 'react-icons/ai';
import { IoAirplane } from 'react-icons/io5';
import { IoIosBed } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import { Menu, MenuItem as MuiMenuItem, IconButton } from '@mui/material';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { Menu as BaseMenu } from '@mui/base/Menu';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Logo from './Logo';
import User from './images/vince.png'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import KingBedIcon from '@mui/icons-material/KingBed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import './css/header.css';
import zIndex from '@mui/material/styles/zIndex';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserIcon(token);
      fetchUserName(token);
    }
  }, []);
  const fetchUserIcon = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/userIcon', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const iconUrl = URL.createObjectURL(response.data);
      setUserIcon(iconUrl);
    } catch (err) {
      console.error('Failed to fetch user icon:', err);
    }
  };
  const fetchUserName = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/userProfile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { firstName, lastName } = response.data;
      setUserName(`${firstName} ${lastName}`);
    } catch (err) {
      console.error('Failed to fetch user name:', err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/');
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
      handleClose();
    };
  };
  const handleFavorite = () =>{
    navigate('/Favorites');
  };
  return (
    <div className="header-box">
      <div className="features">
        <Link to="/list-flight">
            <button className='findButton'>
            <AirplanemodeActiveIcon className="airplane-icon" />Find Flight
            </button>
        </Link>
        <HorizontalRuleIcon className="line"/>
        <Link to="/hotel">
          <button className='findButton'>
            <KingBedIcon className="bed-icon" /> Find Stays
            </button>
        </Link>
      </div>
      
      <Logo />
      <div className="account-details">


        <Dropdown sx={{zIndex: 1212}}>
          {isLoggedIn ? (
            <>
            {/* <Link to="/Favorites">
            <button className='findButton'>
                <FavoriteIcon className="favorites-icon" />Favorites 
              </button>
            </Link> */}
              <Link to="/user">
                <button className='userButton'>
                <Avatar className='userIcon' alt="User" src={userIcon || '/path/to/default.png'} />
                  <span className='userSpan'>{userName}</span>
                </button>
              </Link>
              <HorizontalRuleIcon className="line"/>
              <BaseMenuButton className='accButton'  sx={{zIndex: 1111 }}>
                <KeyboardArrowDownIcon />
              </BaseMenuButton>
              <BaseMenu slots={{ listbox: Listbox }} sx={{ zIndex: 9999, position: 'absolute' }}>
                <StyledMenuItem onClick={handleFavorite} sx={{zIndex: 1111 }}>
                  <FavoriteIcon /> Favorite <ChevronRightIcon className='rightIcon'/>
                </StyledMenuItem>
                {/* <StyledMenuItem onClick={createHandleMenuClick('Payments')}>
                  <PaymentIcon /> Payments <ChevronRightIcon className='rightIcon'/>
                </StyledMenuItem>
                <StyledMenuItem onClick={createHandleMenuClick('Settings')}>
                  <SettingsIcon /> Settings <ChevronRightIcon className='rightIcon'/>
                </StyledMenuItem> */}
                <StyledMenuItem onClick={handleLogout} sx={{zIndex: 1111 }}>
                  <LogoutIcon /> Logout <ChevronRightIcon className='rightIcon'/>
                </StyledMenuItem>
              </BaseMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className='loginButton'>Login</button>
              </Link>
              <Link to="/signup">
                <button className='signupButton'>Sign Up</button>
              </Link>
            </>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 9999;
  position: relative;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `,
);

const StyledMenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;
  z-index: 1221;
  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    z-index: 9999;
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  z-index: 9999;
  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    z-index: 9999;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);

export default Header;

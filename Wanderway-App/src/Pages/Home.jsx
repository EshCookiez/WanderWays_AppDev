import React from 'react';
import { Link } from 'react-router-dom';
import { IoAirplane } from "react-icons/io5";
import Header from '../Components/Header.jsx'

const Home = () => {
    return (
        <div className='Title' style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
        <Header/>
            <h1>Main App for Customers</h1>
                 <div className='router-buttons' style={{display: 'flex', flexDirection: 'row', padding: '20px', gap: '10px'}}>
                    {/* Ari e link nato ato pages */}
                    <Link to="/list-flight">
                        <button style={{ display: 'flex', alignItems: 'center' }}>
                            Flight List <IoAirplane style={{ marginLeft: '8px' }}/>
                        </button>
                    </Link>
                    <Link to="/create/flight">
                        <button>
                            Book Flight
                        </button>
                    </Link>
                    <Link to="/customerList">
                        <button>Customer List</button>
                    </Link>
                    <Link to="/book-accommodation">
                        <button>Book Accommodation</button>
                    </Link>
                    <Link to="/list-accommodation">
                        <button>List of Accommodation</button>
                    </Link>
                    <Link to="/roomList">
                        <button>Room List</button>
                    </Link>
                    <Link to="/login">
                        <button>Log In</button>
                    </Link>
                    <Link to="/Favorites">
                        <button>Favorites</button>
                    </Link>
                    <Link to="/Addfav">
                        <button>AddFavorites</button>
                    </Link>
                    
                    </div>
        </div>
    );
};

export default Home;
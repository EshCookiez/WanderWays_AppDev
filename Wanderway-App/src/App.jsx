import './app.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking/FlightBooking';
import FlightBooking_Update from './Pages/FlightBooking/FlightBooking_Update';
import FlightList from './Pages/FlightBooking/FlightList';
import CustomerList from './Pages/Customer/CustomerList';
import CustomerForm from './Pages/Customer/CustomerForm';
import AcmBooking from './Pages/Acm/AcmBooking'; 
import AcmList from './Pages/Acm/AcmList';
import AcmForm from './Pages/Acm/AcmForm';
import RoomList from './Pages/Rooms/RoomList';
import RoomForm from './Pages/Rooms/RoomForm';
import Home from './Pages/Home';
import LoginPage from './Pages/LogIn/LoginPage';
import SignUpForm from './Pages/SignUp/SignUpForm';
import HomeLanding from './Pages/HomeLanding/HomeLanding'
import Favorites from './Pages/Favorites/FavoriteList'
import HotelSearch from './Pages/Acm/HotelSearch';
import Addfav from './Pages/Favorites/favorites'
import CreateFlight from './Pages/FlightBooking/CreateFlight';
import CustomerProfile from './Pages/CustomerProfile/CustomerProfile';
import HotelListing from './Pages/Acm/HotelListing';
import FlightSearch from './Pages/FlightBooking/FlightSearch/FlightSearch';
import FlightPayment from './Pages/FlightPayment/FlightPayment.jsx';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Route diri para sa html or react pages gi gamit para sa ato features*/}
                    <Route path="/" element={<HomeLanding/>} />

                    <Route path="/book/:flightId/:price" element={<FlightBooking />} />
                    <Route path="/list-flight" element={<FlightList />} />
                    <Route path="/create/flight" element={<CreateFlight/>} />
                    <Route path="/bookUpdate/:fbookId" element={<FlightBooking_Update />} />
                    <Route path="/flight-search" element={<FlightSearch/>}/>
                    <Route path="/flight-payment/" element={<FlightPayment/>}/>

                    <Route path="/customerList" element={<CustomerList />} />
                    <Route path="/addCustomer" element={<CustomerForm />} />
                    <Route path="/updateCustomer/:id" element={<CustomerForm />} />

                    <Route path="/book-accommodation" element={<AcmBooking />} /> 
                    <Route path="/list-accommodation" element={<AcmList />} />
                    <Route path="/addAccommodation" element={<AcmForm />} />
                    <Route path="/acmForm/:id" element={<AcmForm />} />
                    <Route path="/hotelsearch" element={<HotelSearch/>}/>
                    <Route path="/hotelListing" element={<HotelListing/>}/>

                    <Route path="/roomList" element={<RoomList />} />
                    <Route path="/addRoom" element={<RoomForm />} />
                    <Route path="/updateRoom/:id" element={<RoomForm />} />
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path ="/addFav" element={<Addfav/>}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/customerProfile" element={<CustomerProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

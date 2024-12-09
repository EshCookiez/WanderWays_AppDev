import './app.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking/FlightBooking';
import FlightBooking_Update from './Pages/FlightBooking/FlightBooking_Update';
import FlightList from './Pages/FlightBooking/FlightList';
import CustomerList from './Pages/Customer/CustomerList';
import CustomerForm from './Pages/Customer/CustomerForm';
import Home from './Pages/Home';
import LoginPage from './Pages/LogIn/LoginPage';
import SignUpForm from './Pages/SignUp/SignUpForm';
import HomeLanding from './Pages/HomeLanding/HomeLanding'
import Favorites from './Pages/Favorites/FavoriteList'
import Addfav from './Pages/Favorites/favorites'
import CreateFlight from './Pages/FlightBooking/CreateFlight';
import CustomerProfile from './Pages/CustomerProfile/CustomerProfile';
import HotelListing from './Pages/Acm/HotelListing';
import FlightPayment from './Pages/FlightPayment/FlightPayment.jsx';
import HotelBooking from './Pages/Acm/HotelBooking';
import HotelPayment from './Pages/Acm/HotelPayment';
import User from './Pages/User/User.jsx';
import PrivateRoute from './PrivateRoute.jsx';

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
                    <Route path="/flight-payment/" element={<FlightPayment/>}/>

                    <Route path="/customerList" element={<CustomerList />} />
                    <Route path="/addCustomer" element={<CustomerForm />} />
                    <Route path="/updateCustomer/:id" element={<CustomerForm />} />

                    <Route path="/hotel" element={<HotelListing/>}/>
                    <Route path='/hotelBook' element={<HotelBooking/>}/>
                    <Route path='/hotelPay' element={<HotelPayment/>}/>
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user" element={<PrivateRoute><User/></PrivateRoute>}/>
                    
                    <Route path="/signup" element={<SignUpForm />} />
                    
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path ="/addFav" element={<Addfav/>}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/customerProfile" element={<CustomerProfile />} />

                    <Route path="/user" element={<User/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

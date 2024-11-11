import './app.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking/FlightBooking';
import FlightBooking_Update from './Pages/FlightBooking/FlightBooking_Update';
import FlightList from './Pages/FlightBooking/FlightList';
import CustomerList from './Pages/CustomerList';
import CustomerForm from './Pages/CustomerForm';
import AcmBooking from './Pages/AcmBooking'; 
import AcmList from './Pages/AcmList';
import AcmForm from './Pages/AcmForm';
import RoomList from './Pages/Rooms/RoomList';
import RoomForm from './Pages/Rooms/RoomForm';
import Home from './Pages/Home';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Route diri para sa html or react pages gi gamit para sa ato features*/}
                    <Route path="/" element={<Home/>} />

                    <Route path="/book/:flightId/:price" element={<FlightBooking />} />
                    <Route path="/list-flight" element={<FlightList />} />
                    <Route path="/bookUpdate/:fbookId" element={<FlightBooking_Update />} />

                    <Route path="/customerList" element={<CustomerList />} />
                    <Route path="/addCustomer" element={<CustomerForm />} />
                    <Route path="/updateCustomer/:id" element={<CustomerForm />} />
                    <Route path="/book-accommodation" element={<AcmBooking />} /> 
                    <Route path="/list-accommodation" element={<AcmList />} />
                    <Route path="/addAccommodation" element={<AcmForm />} />
                    <Route path="/acmForm/:id" element={<AcmForm />} />
                    <Route path="/roomList" element={<RoomList />} />
                    <Route path="/addRoom" element={<RoomForm />} />
                    <Route path="/updateRoom/:id" element={<RoomForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

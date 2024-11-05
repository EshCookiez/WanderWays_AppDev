import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './FlightBooking/FlightBooking';
import FlightBooking_Update from './FlightBooking/FlightBooking_Update';
import FlightList from './FlightBooking/FlightList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import AcmBooking from './AcmBooking'; 
import AcmList from './AcmList';
import AcmForm from './AcmForm';
import RoomList from './Rooms/RoomList';
import RoomForm from './Rooms/RoomForm';

function Home(){
    return(
        <Router>
        <div>
            <Routes>
                <Route path="/" element={
                    <div className='Title' style={{display: 'flex', flexDirection: 'column', padding: '20px' }}>
                        <h1>Main App for Customers</h1>
                        <div className='router-buttons' style={{display: 'flex', flexDirection: 'row', padding: '20px' }}>
                        {/* Ari e link nato ato pages */}
                        <Link to="/list-flight">
                            <button>Flight List</button>
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
                        </div>

                    </div>
                } />

                {/* Route diri para sa html or react pages gi gamit para sa ato features*/}
                <Route path="/book/:flightId" element={<FlightBooking />} />
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
    )
}

export default Home;
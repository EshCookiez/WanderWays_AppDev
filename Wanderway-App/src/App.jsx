import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking';
import FlightBooking_Update from './Pages/FlightBooking_Update';
import FlightList from './Pages/FlightList';
import CustomerList from './Pages/CustomerList';
import CustomerForm from './Pages/CustomerForm';
import AcmBooking from './Pages/AcmBooking'; 
import AcmList from './Pages/AcmList';
import AcmForm from './Pages/AcmForm';

function App() {
    return (
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;

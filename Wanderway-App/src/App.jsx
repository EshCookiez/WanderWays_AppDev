import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking';
import CustomerList from './Pages/CustomerList';
import CustomerForm from './Pages/CustomerForm';
import AcmBooking from './Pages/AcmBooking'; 

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Main App for Customers</h1>
                            <Link to="/book-flight">
                                <button>Book Flights</button>
                            </Link>
                            <Link to="/customerList">
                                <button>Customer List</button>
                            </Link>
                            <Link to="/book-accommodation">
                                <button>Book Accommodation</button>
                            </Link>
                        </div>
                    } />
                    <Route path="/book-flight" element={<FlightBooking />} />
                    <Route path="/customerList" element={<CustomerList />} />
                    <Route path="/addCustomer" element={<CustomerForm />} />
                    <Route path="/updateCustomer/:id" element={<CustomerForm />} />
                    <Route path="/book-accommodation" element={<AcmBooking />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;

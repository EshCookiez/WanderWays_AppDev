import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking';

function App() {

    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Main App for Customers</h1>
                            <Link to="/book-flight">
                                <button>Book Flights</button>
                            </Link>
                           
                        </div>
                    } />


                    <Route path="/book-flight" element={<FlightBooking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App

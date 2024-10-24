import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking';

function App() {
    {/* SUBJECT TO CHANGES  */}
    return(
        <Router>
            <div>
                {/*Test rani ari e butang ato pang link sa different features*/}
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Main App for Customers</h1>
                            {/* Ari e link nato ato pages */}
                            <Link to="/book-flight">
                                <button>Book Flights</button>
                            </Link>
                           
                        </div>
                    } />

                    {/* Route diri para sa html or react pages gi gamit para sa ato features*/}
                    <Route path="/book-flight" element={<FlightBooking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App

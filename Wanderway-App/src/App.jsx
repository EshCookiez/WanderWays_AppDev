import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightBooking from './Pages/FlightBooking';
import FlightList from './Pages/FlightList';
import FlightBooking_Update from './Pages/FlightBooking_Update';

function App() {
    {/* SUBJECT TO CHANGES  */}
    return(
        <Router>
            <div>
                {/*Test rani ari e butang ato pang link sa different features*/}
                <Routes>
                    <Route path="/" element={
                        <div className='router-buttons' style={{display: 'flex', flexDirection: 'column', padding: '20px' }}>
                            <h1>Main App for Customers</h1>
                            {/* Ari e link nato ato pages */}
                            <Link to="/list-flight">
                                <button>Flight List</button>
                            </Link>
                           
                        </div>
                    } />

                    {/* Route diri para sa html or react pages gi gamit para sa ato features*/}
                    <Route path="/book/:flightId" element={<FlightBooking />} />
                    <Route path="/list-flight" element={<FlightList />} />
                    <Route path="/bookUpdate/:fbookId/:flightId" element={<FlightBooking_Update />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App

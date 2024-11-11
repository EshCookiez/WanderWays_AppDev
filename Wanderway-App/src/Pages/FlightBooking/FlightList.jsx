import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header.jsx'
import { RxLoop } from "react-icons/rx";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import './flightscss.css';
import { IoAirplane } from 'react-icons/io5';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [booked, setBooked] = useState([]);
  const [error, setError] = useState(null); 

  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState('');


  const fetchFlights = () => {
    fetch('http://localhost:8080/api/flights/all')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setFlights(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        setError("Failed to fetch flights. Please try again later.");
        console.error("Error fetching flights:", error);
      });
  };

  const fetchBookedFlights = () => {
    fetch('http://localhost:8080/api/bookings/all')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setBooked(Array.isArray(data) ? data : []);
        console.log("Booked flights:", data); 
      })
      .catch(error => {
        console.error("Error fetching booked flights:", error);
      });
      
  };

  const handleDeleteBooking = (fbookId) => {
    fetch(`http://localhost:8080/api/bookings/delete/${fbookId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      
      setBooked(prevBooked => prevBooked.filter(booking => booking.fbookId !== fbookId));
    })
    .catch(error => {
      console.error("Error deleting booking:", error);
     
    });
  };

  useEffect(() => {
    fetchFlights();
    fetchBookedFlights();
  }, []);

  const filteredFlights = flights.filter(flight =>
    flight.location_origin.toLowerCase().includes(originSearch.toLowerCase()) &&
    flight.location_destination.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  return (
    <div className='main-box'>
        <div className='sample-header' > 
          <Header/>
        </div>
        
        <div className='search-box'>
          <div className="search-origin">
            <div className="input-wrapper">
              <input
                type="text" 
                placeholder="From"
                value={originSearch}
                onChange={e => setOriginSearch(e.target.value)} 
                style={{ padding: '10px 40px 10px 10px', width: '500px' }}
              />
              <RxLoop className="loop-icon" />
            </div>
          </div>

          <div className='search-destination'>
            <div className='input-wrapper'>
              <input
                  type="text" 
                  placeholder='To'
                   value={destinationSearch}
                  onChange={e => setDestinationSearch(e.target.value)} 
                  style={{padding: '10px',  width: '500px'}}
                />
              <FaMagnifyingGlassLocation className='destination-icon'/>
            </div>
          </div>
        </div>

        
      <div className='list-container' 
      style={{ display: 'flex', flexDirection: 'row',gap: '20px', margin : '20px 20px'}}>
      <div className='flights-box' 
      style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px' }}>
        <h2>Available Flights</h2>
        {flights.length > 0 ? (
          filteredFlights.map(flight => (
            <div key={flight.flight_id} 
            style={{border: "1px solid #ddd", padding: "10px", margin: "10px 0"}}>
              <h2>Flight ID : {flight.flightId}</h2>
              <h4>from {flight.location_origin} -<IoAirplane className='airplane-icon'/>- to {flight.location_destination}</h4>
              <p>Departure: {flight.dateDepart} --- Arrival: {flight.dateArrival}</p>
              <p>Class: {flight.flight_class} - Rating: {flight.rating} -- Price: ${flight.price}</p>
              <Link to={`/book/${flight.flightId}/${flight.price}`}>
                <button style={{width: '90%'}}>BOOK THIS FLIGHT</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading flights...</p>
        )}
      </div>


      <div className='booked-box' 
      style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px'}}>
        <h2>Your Booked Flights</h2>
        {booked.length > 0 ? (
          booked.map(booking => (
            <div key={booking.fbookId} 
            style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h2>Flight ID: {booking.flight.flightId} -- Booking ID: {booking.fbookId} -- Price: ${booking.flight.price}</h2> 
              <p style={{fontWeight: 'bold'}}>Passenger Amount: {booking.passengerAmount} ---- Fare Class: {booking.fareClass}</p>
              <Link to={`/bookUpdate/${booking.fbookId}`}>
                <button style={{width: '40%'}}>UPDATE</button>
              </Link>
              <button id='delete-button' onClick={() => handleDeleteBooking(booking.fbookId)} style={{margin: '0px 0px 5px 5px',width: '40%'}}>
                DELETE
              </button>
            </div>
          ))
        ) : (
          <p>Loading booked flights...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
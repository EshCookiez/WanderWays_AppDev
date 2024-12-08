import React from 'react';
import { Link } from 'react-router-dom';
import { IoAirplane } from 'react-icons/io5';
import TextField from '../../Components/TextField/TextField'
import './List.css'
import sampleimg from './samplelogo.png'

const AvailableFlights = ({ flights, originSearch, destinationSearch, setOriginSearch, setDestinationSearch }) => {
  const filteredFlights = flights.filter(flight =>
    (flight.location_origin?.toLowerCase() || '').includes(originSearch.toLowerCase()) &&
    (flight.location_destination?.toLowerCase() || '').includes(destinationSearch.toLowerCase())
  );

  return (
    <div className="flights-box">
      <div className="search-box">
        <TextField
          label="From"
          type="text"
          placeholder="From"
          value={originSearch}
          onChange={(e) => setOriginSearch(e.target.value)}
          style={{ padding: '10px', width: '250px' }}
        />
        <TextField
          label="To"
          type="text"
          placeholder="To"
          value={destinationSearch}
          onChange={(e) => setDestinationSearch(e.target.value)}
          style={{ padding: '10px'}}
        />
      </div>


      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <div key={flight.flight_id} className="list-content">
            <li class="list-items">
              <div class="image-container">
                 <img src={sampleimg} alt="Sample Logo" />
              </div>
              <div class="container">

                <div class="row md-5 d-flex align-items-center">
                  <div class="col-1 text-start d-flex align-items-center">
                    <h3 className="rating ms-2">{flight.rating}</h3>
                  </div>
                  <div class="col text-end">
                    <h2 className="price">${ flight.price }</h2>
                  </div>
                </div>

                <div class="row py-3">
                  <div class="col-10 text-start">
                    <h4>{ flight.location_origin }  <IoAirplane/>  { flight.location_destination }</h4>
                  </div>
                  <div class="col-2 text-center">
                      { flight.flight_class }  
                  </div>
                </div>
                
                <div class="row py-1">
                  <div class="col-10 text-start">
                    <h5>Departs: { flight.dateDepart } - Arrives: { flight.dateArrival }</h5>
                  </div>
                </div>

                <div class="row py-3">
                    <div class="col text-start">
                        <div class="row-button">
                            <Link to={`/book/${flight.flightId}/${flight.price}`} style={{width: '100%'}}>
                              <button style={{ width: '100%'}}>BOOK THIS FLIGHT</button>
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
          </div>
        ))
      ) : (
        <p>No flights available</p>
      )}
      
    </div>
  );
};

export default AvailableFlights;
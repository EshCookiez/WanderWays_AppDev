import React from 'react';
import { Link } from 'react-router-dom';
import { IoAirplane } from 'react-icons/io5';
import sampleimg from './samplelogo.png'

const BookedFlights = ({ booked, handleDeleteBooking }) => {
  return (
    <div className="booked-box">
      {booked.length > 0 ? (
        booked.map((booking) => (
          <div key={booking.fbookId} className="list-content">
            <div className="list-items">
              <div class="image-container">
                 <img src={sampleimg} alt="Sample Logo" />
              </div>
              <div className="container">
                <div className="row md-5 d-flex align-items-center">
                  <div className="col-1 text-start d-flex align-items-center">
                    <h3 className="rating ms-2">{booking.flight.rating}</h3>
                  </div>
                  <div className="col text-end">
                    <h2 className="price">${booking.flight.price}</h2>
                  </div>
                </div>

                <div className="row py-1">
                  <div className="col-10 text-start">
                    <h4>
                      {booking.flight.location_origin} <IoAirplane /> {booking.flight.location_destination}
                    </h4>
                  </div>
                  <div className="col-2 text-center">
                    {booking.flight.flight_class}
                  </div>
                </div>

                <div className="row py-1">
                  <div className="col-10 text-start">
                    <h5>
                      Departs: {booking.flight.dateDepart} - Arrives: {booking.flight.dateArrival}
                    </h5>
                  </div>
                </div>
                <div className="row py-3">

                <div className="row py-1">
                  <div className="col-9 text-start">
                      Passengers: {booking.passengerAmount}
                  </div>
                  <div className="col-3 text-center">
                      Fare Class: {booking.fareClass}
                  </div>
                </div>

                </div>

                <div className="row py-3">
                  <div className="col">
                    <div className="row-button">
                      <Link to={`/bookUpdate/${booking.fbookId}`}>
                        <button style={{ width: '100%' }}>UPDATE</button>
                      </Link>
                    </div>
                  </div>

                  <div className="col">
                      <button
                        id="delete-button"
                        onClick={() => handleDeleteBooking(booking.fbookId)}
                        style={{ margin: '0px 0px 5px 5px', width: '100%' }}
                      >
                        DELETE
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No booked flights found</p>
      )}

    </div>
  );
};

export default BookedFlights;
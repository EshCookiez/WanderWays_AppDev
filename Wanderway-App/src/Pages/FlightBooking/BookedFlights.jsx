import React from 'react';
import { Link } from 'react-router-dom';
import { IoAirplane } from 'react-icons/io5';
import sampleimg from './samplelogo.png'
import './List.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { MdDeleteForever, MdOutlineUpdate  } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

const BookedFlights = ({ booked, handleDeleteBooking }) => {
  console.log(booked);
  return (
    <div className="booked-box">
      {booked.length > 0 ? (
        booked.map((booking) => (
          <div key={booking.fbookId} className="list-content">
            <div className="list-items">
              <div class="image-container">
                <Card sx={{ width: '100%', height: '110%', boxShadow: 'none', maxWidth: 330, maxHeight: 440 }}>
                  <img
                    src={sampleimg}
                    alt="Sample Logo"
                    style={{ width: '100%', height: '185px', objectFit: 'cover' }}
                  />
                  <CardContent className='cardContent'>
                    <Typography gutterBottom variant="body1" component="div" className="customTypography" sx={{ mr: 23 }}>
                      <Tooltip title="Update Booking" arrow>
                        <Link to={`/bookUpdate/${booking.fbookId}`} id='updateLink'>
                          <MdOutlineUpdate className='icon'/>
                        </Link>
                      </Tooltip>
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" className="customTypography" >
                      <Tooltip title="Delete Booking" arrow>
                        <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteBooking(booking.fbookId);
                            }}
                            id='deleteLink'
                          >
                          < MdDeleteForever className='icon'/>
                        </Link>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Card>
                 
              </div>
              <div className="container">
                <div className="row md-5 d-flex align-items-center">
                  <div className="col-1 text-start d-flex">
                    <h3 className="rating ms-1">{booking.flight.rating}</h3>
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
                  <div className="col-4 text-start">
                      Passengers: {booking.passengerAmount}
                  </div>
                  <div className="col-4 text-center">
                      Status: {booking.status}
                  </div>
                  <div className="col-4 text-end">
                      Fare Class: {booking.fareClass}
                  </div>
                </div>

                </div>

                <div className="row py-3">
                  <div className="col">
                  {booking.status !== "Fully Paid" ? (
                      <Link 
                        to={{
                          pathname: `/flight-payment`,
                          search: `?bookingid=${booking.fbookId}&origin=${booking.flight.location_origin}
                          &destination=${booking.flight.location_destination}&price=${booking.flight.price}
                          &departure=${booking.flight.dateDepart}&arrival=${booking.flight.dateArrival}
                          &flightclass=${booking.flight.flight_class}&fareclass=${booking.fareClass}
                          &passengers=${booking.passengerAmount}
                          `
                        }}
                      >
                        <button  style={{ margin: '0px 0px 5px 5px', width: '100%' }}>
                          PAYMENT
                        </button>
                      </Link>
                    ) : (
                      <h5></h5>
                    )}
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
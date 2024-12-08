import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Forms.module.css'
import TextField from '../../Components/TextField/TextField';
import OptionsField from '../../Components/OptionsField/OptionsField';
import Button from '../../Components/Button/Button';
import AirplaneImage from './assets/FormsImage5.jpg';
import { useNavigate } from 'react-router-dom';

function FlightBooking_Update() {
    const { flightId, fbookId } = useParams();
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fareclass) {
            setMessage('Please select a seat class.');
            return;
        }
        
        const BookingData = {
            fareClass: fareclass,
            passengerAmount: parseInt(travellerCtr, 10),
            flight: { flightId: parseInt(flightId, 10) },
            fbook_Id: fbookId
        };
    
        try {
            console.log("Flight ID:", flightId, "Booking ID:", fbookId);
    
            const response = await fetch(`http://localhost:8080/api/bookings/update/${fbookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(BookingData)
            });
    
            if (response.ok) {
                setMessage('Flight booking updated successfully!');
                setTimeout(() => {
                    navigate('/list-flight');
                }, 2000);
            } else {
                setMessage("Failed to update booking");
            }
        } catch (error) {
            setMessage('Error occurred while updating the booking.');
        }
    };

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${fbookId}`);
                const booking = response.data;
                setTravellersCtr(booking.passengerAmount);
                setFareclass(booking.fareClass);
            } catch (error) {
                setMessage('');
            }
        };
    
        fetchBookingData();
    }, [fbookId]);



    return (
        <main className={styles.FormsPage}>
            <aside className={styles.imageSection}>
                <img src={AirplaneImage} alt="Scenic travel destination" className={styles.scenicImage} />
            </aside>
            <div className={styles.contentWrapper}>
                <section className={styles.formSection}>
                    <Link to='/'>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/633aaaa339ee7af67a22595035717caa8c4a23d51c73dfdc999464c1de6a97bb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="WanderWays logo" className={styles.logo} />
                    </Link>  
                    <h1 className={styles.title}>Update your Booking</h1>
                    <h2 className={styles.title}>Booking ID: {fbookId}</h2>
                    {message && <p>{message}</p>}
                    <form onSubmit={handleSubmit} style={{ margin: '20px'}}>
                    <OptionsField
                            label="Seat Class"
                            type="select"
                            name="fareclass"
                            value={fareclass}
                            onChange={(e) => setFareclass(e.target.value)}
                            options={['Economy', 'Business', 'First-Class']}
                            required 
                            style={{ padding: '10px', width: '90%'}}
                        />
                        <TextField
                            label='Number of Travellers'
                            type="number" 
                            placeholder="Enter Number of Travellers" 
                            value={travellerCtr}
                            onChange={(e) => setTravellersCtr(e.target.value)} 
                            required 
                            style={{ padding: '10px', width: '90%'}}
                        />
                        <Button type='submit' className={styles.button}>Update Booking</Button>
                        <div className={styles.formOptions}>
                            <Link to={`/list-flight`}>
                               <p className={styles.flightList}>Available Flights</p>
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default FlightBooking_Update
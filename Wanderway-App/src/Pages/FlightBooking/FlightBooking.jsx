import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './flightscss.css';
import styles from './Forms.module.css'
import TextField from '../../Components/TextField/TextField';
import OptionsField from '../../Components/OptionsField/OptionsField';
import Button from '../../Components/Button/Button';
import AirplaneImage from './assets/image1.jpg';

const FlightBooking = () => {
    const { flightId, price } = useParams(); 
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const BookingData = {
            fareClass: fareclass,
            passengerAmount: parseInt(travellerCtr, 10),
            fbook_Id: null,
            flight: { flightId: parseInt(flightId, 10) }

        };
    
        try {
            const response = await axios.post('http://localhost:8080/api/bookings/add', BookingData);
    
            if (response.status === 201) {
                setMessage('Flight booked successfully!');
            } else {
                setMessage("Failed to book Flight");
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            setMessage('Error occurred while booking the flight.');
        }
    };

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
                    <h1 className={styles.title}>Book Your Flights</h1>
                    <h2 h1 className={styles.title}>Flight ID: {flightId} -- Price: ${price}</h2>
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
                        <Button type='submit' className={styles.button}>Book Flight</Button>
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
};

export default FlightBooking;
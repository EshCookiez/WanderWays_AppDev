import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Forms.module.css'
import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import dayjs from 'dayjs';
import AirplaneImage from '../../assets/Airplane.jpg';

const CreateFlight=() => {
    const [message, setMessage] = useState("");
    const [flightData, setFlightData] = useState({
        rating: '',
        dateDepart: '',
        dateArrival:'',
        flight_class: '',
        location_origin:'',
        location_destination:'',
        price:'',
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData({ ...flightData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formattedFlightData = {
            ...flightData,
            dateDepart: dayjs(flightData.dateDepart).format('YYYY-MM-DD HH:mm'),
            dateArrival: dayjs(flightData.dateArrival).format('YYYY-MM-DD HH:mm'),
        };

    try {
        const response = await fetch(`http://localhost:8080/api/flights/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedFlightData),
        });
    
            if (response.ok) {
                setMessage('Flight created successfully!');
            } else {
                setMessage("Failed to create flight");
            }
        } catch (error) {
            setMessage('Error occurred while creating flight.');
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
                <h1 className={styles.title}>Create Flight</h1>
                <form onSubmit={handleSubmit}>
                        <TextField
                            label='Rating'
                            type="text" 
                            name="rating" 
                            value={flightData.rating || ''} 
                            onChange={handleInputChange}
                            placeholder="Rating" 
                            required />
                        <TextField
                            label='Departure time'
                            type="datetime-local"
                            name="dateDepart" 
                            value={flightData.dateDepart || ''} 
                            onChange={handleInputChange} 
                            placeholder="Departure Date"
                            required/>
                        <TextField
                            label='Arrival Time'
                            type="datetime-local"
                            name="dateArrival"  
                            value={flightData.dateArrival || ''}
                            onChange={handleInputChange} 
                            placeholder="Arrival Date"
                            required />
                        <TextField
                            label='Flight Class'
                            type="text" 
                            name="flight_class" 
                            value={flightData.flight_class || ''}  
                            onChange={handleInputChange} 
                            placeholder="Flight Class"
                            required />
                        <TextField
                            label='Location Origin'
                            type="text" 
                            name="location_origin" 
                            value={flightData.location_origin || ''} 
                            onChange={handleInputChange} 
                            placeholder="Origin"
                            required/>
                        <TextField
                            label='Flight Destination'
                            type="text" 
                            name="location_destination" 
                            value={flightData.location_destination || ''} 
                            onChange={handleInputChange} 
                            placeholder="Destination"
                            required />
                        <TextField
                            label='Price'
                            type="number" 
                            name="price" 
                            value={flightData.price || ''}  
                            onChange={handleInputChange} 
                            placeholder="Price"
                            required/>
                            <Button type='submit' className={styles.button}>Create Flight</Button>
                            <div className={styles.formOptions}>
                            <Link to={`/list-flight`}>
                               <p className={styles.flightList}>Available Flights</p>
                            </Link>
                            </div>
                </form>
                {message && <p>{message}</p>}
                </section>
            </div>
        </main>
    );
};

export default CreateFlight;
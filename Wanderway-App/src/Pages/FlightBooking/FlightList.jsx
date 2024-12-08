import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AvailableFlights from './AvailableFlights.jsx';
import BookedFlights from './BookedFlights.jsx';
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import styles from './flights.module.css';
import logo from '././Assets/AIRPORT.jpg';
import Loader from '../../Components/Loader/AirplaneSpinner.jsx'

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [booked, setBooked] = useState([]);
  const [originSearch, setOriginSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [value, setValue] = useState(0);

  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };
  
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)  
    }, 2000);
    fetch('http://localhost:8080/api/flights/all')
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching flights:', error));
      console.log(flights)

    fetch('http://localhost:8080/api/bookings/all')
      .then((response) => response.json())
      .then((data) => setBooked(data))
      .catch((error) => console.error('Error fetching booked flights:', error));
  }, []);

  const handleDeleteBooking = (fbookId) => {
    fetch(`http://localhost:8080/api/bookings/delete/${fbookId}`, { method: 'DELETE', credentials: 'include', })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }
            // If successful, remove the booking from the state
            setBooked((prevBooked) => prevBooked.filter((booking) => booking.fbookId !== fbookId));
        })
        .catch(error => console.error('Error deleting booking:', error));
};

  const StyledTabs = styled(Tabs)({
    backgroundColor: '#fff', 
    '& .MuiTabs-indicator': {
      backgroundColor: '#8dd3bb', 
    },
  });
  
  const StyledTab = styled(Tab)(({ theme }) => ({
    flexGrow: 1, // Ensures equal space distribution
    maxWidth: '50%', // Caps the width at 50%
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5f9784', 
    '&.Mui-selected': {
      color: '#5f9784', 
    },
    '&:hover': {
      backgroundColor: '#8dd3bb', 
      color: 'black',
    },
  }));

  return (
  <div className={styles.body}> 
   <Header/>
  {loading ? (
    <Loader />
  ): (
    <>
        <div className={styles.mainBox}>
      <section className={styles.heroSection}>
            <img src={logo} alt="Travel destination" className={styles.heroImage} />
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Wander the World</h1>
                <h1 className={styles.heroTitle}>Your way!</h1>
            </div>
      </section>
      <main className={styles.contentBox}>
        <Box sx={{ borderBottom: 1, borderColor: 'white',overflow: 'hidden',
        borderTopLeftRadius: '4px', borderTopRightRadius: '4px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <StyledTab label="Available Flights" {...a11yProps(0)} />
          <StyledTab label="Booked Flights" {...a11yProps(1)} />
        </StyledTabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <AvailableFlights
            flights={flights}
            originSearch={originSearch}
            destinationSearch={destinationSearch}
            setOriginSearch={setOriginSearch}
            setDestinationSearch={setDestinationSearch}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <BookedFlights booked={booked} handleDeleteBooking={handleDeleteBooking} />
        </CustomTabPanel>
      </main>
      <Footer/>
    </div>
    </>
  )}
   
    </div>
  );
};

export default FlightList;
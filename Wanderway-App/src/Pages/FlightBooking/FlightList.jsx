import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AvailableFlights from './AvailableFlights.jsx';
import BookedFlights from './BookedFlights.jsx';
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import styles from './flights.module.css';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [booked, setBooked] = useState([]);
  const [originSearch, setOriginSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [value, setValue] = useState(0);

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
    fetch('http://localhost:8080/api/flights/all')
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching flights:', error));

    fetch('http://localhost:8080/api/bookings/all')
      .then((response) => response.json())
      .then((data) => setBooked(data))
      .catch((error) => console.error('Error fetching booked flights:', error));
  }, []);

  const handleDeleteBooking = (fbookId) => {
    fetch(`http://localhost:8080/api/bookings/delete/${fbookId}`, { method: 'DELETE' })
      .then(() => {
        setBooked((prevBooked) => prevBooked.filter((booking) => booking.fbookId !== fbookId));
      })
      .catch((error) => console.error('Error deleting booking:', error));
  };

  const StyledTabs = styled(Tabs)({
    backgroundColor: '#f5f5f5', 
    '& .MuiTabs-indicator': {
      backgroundColor: '#8dd3bb', 
    },
  });
  
  const StyledTab = styled(Tab)(({ theme }) => ({
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
  <body className={styles.body}> 
    <div className={styles.mainBox}>
      <Header/>
      <main className={styles.contentBox}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
    </div>
    <Footer/>
    </body>
  );
};

export default FlightList;
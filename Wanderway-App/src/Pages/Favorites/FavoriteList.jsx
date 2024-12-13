import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FavoritesList.css";
import Header from "../../Components/Header";
import sea from "./favAsset/seaBay.png";
import { 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Modal, 
  Backdrop, 
  Fade, 
  List, 
  ListItem, 
  ListItemText 
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useNavigate } from "react-router-dom";
import AcmService from "../../services/AcmService"; // Ensure AcmService is imported
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]); // List of FavoriteDTOs
  const [selectedType, setSelectedType] = useState('Hotels');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null); // New state for favoriteId
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [favoriteToDelete, setFavoriteToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [token, selectedType]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/favorites/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Validate favorites response
      if (Array.isArray(response.data)) {
        // Filter favorites based on selected type and map accommodations with image sources
        const filteredFavorites = response.data
          .filter(
            (fav) =>
              fav.accommodation.acm_type.toLowerCase() === selectedType.toLowerCase()
          )
          .map((fav) => ({
            ...fav,
            favoriteId: fav.favoriteId, // Adjust based on actual property name
            accommodation: {
              ...fav.accommodation,
              id: fav.accommodation.id, // Ensure accommodation has an 'id' property
              imageSrc: fav.accommodation.image
                ? `data:image/jpeg;base64,${fav.accommodation.image}`
                : 'https://via.placeholder.com/150',
              acmLogoSrc: fav.accommodation.acmLogo
                ? `data:image/jpeg;base64,${fav.accommodation.acmLogo}`
                : 'https://via.placeholder.com/150',
              rooms: Array.isArray(fav.accommodation.rooms)
                ? fav.accommodation.rooms.map((room) => ({
                    ...room,
                    id: room.roomId, // Ensure room has an 'id' property. Change to room.roomId if necessary
                    imageSrc: room.image
                      ? `data:image/jpeg;base64,${room.image}`
                      : 'https://via.placeholder.com/100',
                  }))
                : [],
            },
          }));

        setFavorites(filteredFavorites);
      } else {
        console.error('Unexpected favorites response format:', response.data);
        setError('Failed to load favorites. Please try again later.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load favorites.');
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId) => {
  if (!favoriteId) {
    setAlertMessage("Invalid favorite ID.");
    setAlertSeverity("error");
    setShowAlert(true);
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/api/favorites/delete/${favoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFavorites(favorites.filter((fav) => fav.favoriteId !== favoriteId));
    setAlertMessage("Favorite removed successfully");
    setAlertSeverity("success"); 
    setShowAlert(true);
  } catch (err) {
    console.error("Error removing favorite:", err);
    setAlertMessage("Failed to remove favorite.");
    setAlertSeverity("error");
    setShowAlert(true);
  }
};

  const handleOpen = (fav) => { // Pass the entire fav object
    setSelectedAccommodation(fav.accommodation);
    setSelectedFavoriteId(fav.favoriteId); // Set the selected favoriteId
    setOpen(true);
  };
  const handleDeleteClick = (favoriteId) => {
    setFavoriteToDelete(favoriteId);
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setFavoriteToDelete(null);
  };
  
  const handleDeleteConfirm = async () => {
    if (favoriteToDelete) {
      await removeFavorite(favoriteToDelete);
      setOpenDeleteDialog(false);
      setFavoriteToDelete(null);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedAccommodation(null);
    setSelectedFavoriteId(null);
  };

  const handleBookNow = (room) => {
    console.log('Room Object:', room);
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // User is not logged in, redirect to login page
      alert('Please log in to book a room.');
      navigate('/login');
      return;
    }

    if (selectedAccommodation && room) {
      console.log('Selected Accommodation:', selectedAccommodation);
      console.log('Navigating with accommodationId:', selectedAccommodation.id, 'roomId:', room.id);
      navigate('/hotelBook', { 
        state: { 
          accommodationId: selectedAccommodation.id, // Ensure this is the correct property
          roomId: room.id, // Ensure this is the correct property, change to room.roomId if necessary
        } 
      });
    } else if (selectedAccommodation) {
      const defaultRoom = selectedAccommodation.rooms && selectedAccommodation.rooms.length > 0 ? selectedAccommodation.rooms[0] : null;
      if (defaultRoom) {
        console.log('Navigating with accommodationId:', selectedAccommodation.id, 'default roomId:', defaultRoom.id);
        navigate('/hotelBook', { 
          state: { 
            accommodationId: selectedAccommodation.id,
            roomId: defaultRoom.id, // Change to defaultRoom.roomId if necessary
          } 
        });
      } else {
        console.error('No rooms available for this accommodation.');
        setError('No rooms available for this accommodation.');
      }
    } else {
      console.error('Accommodation data is missing.');
      setError('Accommodation data is missing.');
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading favorites...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div className="favorites-page" style={{ width: "1040px" }}>
      <Header />
      {showAlert && (
      <Alert
        variant="filled"
        severity={alertSeverity}
        onClose={() => setShowAlert(false)}
        sx={{
          position: 'fixed',
          top: '10%',
          width: '80%',
          left: '10%',
          zIndex: 1000,
        }}
      >
        {alertMessage}
      </Alert>
    )}
      <img src={sea} alt="background" className="heroBackground" />
      <div className="main-content">
        <h2>Favorites</h2>

        {/* Row Bar */}
        <div className="row-bar">
          {['Hotels', 'Motels', 'Resorts'].map(type => (
            <Button
              key={type}
              className={`tab ${selectedType === type ? 'active' : ''}`}
              onClick={() => {
                setSelectedType(type);
                fetchFavorites(); // Refetch favorites when type changes
              }}
              sx={{
                fontWeight: selectedType === type ? 'bold' : 'normal',
                color: selectedType === type ? '#000000' : 'inherit',
                backgroundColor: selectedType === type ? '#8dd3bb' : 'inherit',
                textTransform: 'none',
                padding: '1rem 4rem',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: selectedType === type ? '#8dd3bb' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <h3>{type}</h3>
            </Button>
          ))}
        </div>

        {/* Favorites List */}
        <div className="favorites-container">
          {favorites.length === 0 ? (
            <Typography variant="h6">No favorites added yet.</Typography>
          ) : (
            <Box className="hotelList">
              {favorites.map((fav) => {
                const accommodation = fav.accommodation;
                return (
                  <Card key={fav.favoriteId} className="hotelCard">
                    <CardMedia
                      component="img"
                      height="100%"
                      image={accommodation.imageSrc || 'https://via.placeholder.com/150'}
                      alt={accommodation.acm_name}
                      className="hotelImage"
                    />
                    <CardContent className="hotelCardContent">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="hotelTypo"
                        sx={{
                          fontWeight: 700,
                          fontSize: '24px',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        {accommodation.acm_name}
                      </Typography>
                      <Typography variant="body2" className="hotelTypo">
                        <LocationOnIcon sx={{ fontSize: 15 }} />
                        Location: {accommodation.acm_location}
                      </Typography>
                      <Typography variant="body2" className="hotelTypo">
                        {Array.from({ length: accommodation.rate }, (_, index) => (
                          <StarIcon key={index} sx={{ fontSize: 15, color: '#ff8484' }} />
                        ))}
                        Rating: {accommodation.rate}
                      </Typography>
                      <Typography variant="body2" className="hotelTypo">
                        <EmojiFoodBeverageIcon sx={{ fontSize: 15 }} />
                        Amenities: {accommodation.amenities}
                      </Typography>
                      <Typography variant="body2" className="hotelTypo">
                        Description: {accommodation.overview}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="hotelTypo"
                        align="right"
                        sx={{ fontSize: 11, opacity: 0.75 }}
                      >
                        Starting from
                      </Typography>
                      <Typography
                        variant="body2"
                        className="hotelTypo"
                        align="right"
                        sx={{
                          color: '#ff8484',
                          fontWeight: 700,
                          fontSize: '24px',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        ${accommodation.acm_price}/night
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          '& button': { m: 1, opacity: 0.75 },
                        }}
                      >
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: '#fff',
                            color: '#e01a1a',
                            width: '10%',
                            border: '2px solid #e01a1a',
                            '&:hover': {
                              backgroundColor: '#ee4545',
                              color: '#000000'
                            },
                          }}
                          onClick={() => handleDeleteClick(fav.favoriteId)}
                        >
                          <BookmarkRemoveIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: '#8dd3bb',
                            color: '#000000',
                            width: '100%',
                            border: '2px solid #4c987e',
                            fontFamily: 'Montserrat, sans-serif',
                            '&:hover': {
                              backgroundColor: '#4c987e',
                              color: '#ffffff',
                            },
                          }}
                          onClick={() => handleOpen(fav)} // Pass the entire fav object
                        >
                          View Place
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        aria-labelledby="accommodation-modal-title"
        aria-describedby="accommodation-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: '80%', md: '60%' },
                maxHeight: '90vh', 
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
                overflowY: 'auto', 
              }}>
            {selectedAccommodation && (
              <>
                <Typography id="parent-modal-title" variant="h5" gutterBottom>
                  Overview
                </Typography>

                {/* Accommodation Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedAccommodation.imageSrc || 'https://via.placeholder.com/150'}
                  alt={selectedAccommodation.acm_name || 'Accommodation Image'}
                  sx={{ borderRadius: '8px', mb: 2 }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Accommodation Name */}
                  <Typography
                    id="accommodation-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700, fontSize: '24px', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedAccommodation.acm_name}
                  </Typography>
                  
                  {/* Rating */}
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    {Array.from({ length: selectedAccommodation.rate }, (_, index) => (
                      <StarIcon key={index} sx={{ color: '#ff8484' }} />
                    ))}
                    <span style={{ marginLeft: '8px' }}>{selectedAccommodation.rate} Stars</span>
                  </Typography>
                </Box>

                {/* Location */}
                <Typography id="accommodation-modal-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ marginRight: '4px' }} />
                  {selectedAccommodation.acm_location}
                </Typography>

                {/* Amenities */}
                <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <EmojiFoodBeverageIcon sx={{ marginRight: '4px' }} />
                  {selectedAccommodation.amenities}
                </Typography>

                {/* Description */}
                <Typography sx={{ mt: 2 }}>
                  Description: {selectedAccommodation.overview}
                </Typography>
                <hr className="solid"/>

                {/* Rooms Section */}
                <Typography variant="h6" gutterBottom sx={{fontWeight: 700}}>
                  Available Rooms
                </Typography>
                <List>
                  {selectedAccommodation.rooms && selectedAccommodation.rooms.length > 0 ? (
                    selectedAccommodation.rooms.map((room) => (
                      <React.Fragment key={room.id}>
                        <ListItem sx={{ display: 'flex', pl: 0, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                          <img
                            src={room.imageSrc || 'https://via.placeholder.com/100'}
                            alt={`Room ${room.roomName}`}
                            style={{ width: '100px', height: '100px', marginRight: '16px' }}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
                          />
                          <ListItemText
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                            primary={`Room ${room.roomName} - ${room.roomType}`}
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#ff8484', fontWeight: 700, fontSize: 20 }}>
                                  {`$${room.roomPrice}/night`}
                                </Typography>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{ 
                                    fontWeight: 700,
                                    backgroundColor: '#8dd3bb',
                                    color: '#000000',
                                    width: '80%',
                                    border: '2px solid #4c987e',
                                    fontFamily: 'Montserrat, sans-serif',
                                    '&:hover': {
                                      backgroundColor: '#4c987e',
                                      color: '#ffffff',
                                    },
                                  }}
                                  onClick={() => handleBookNow(room)} // Pass the room object
                                >
                                  Book Now
                                </Button>
                              </Box>
                            }
                          />
                        </ListItem>
                        <hr className="solid" />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography variant="body2">No rooms available.</Typography>
                  )}
                </List>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    mt: 2,
                    gap: 2,
                  }}
                >
                  {/* Price */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '20px',
                      color: '#ff8484',
                    }}
                  >
                    Price: ${selectedAccommodation.acm_price}/night
                  </Typography>
                  
                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      '& button': { m: 1, opacity: 0.75 },
                    }}
                  >
                    {/* <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: '#fff',
                        color: '#e01a1a',
                        width: '10%',
                        border: '2px solid #e01a1a',
                        '&:hover': {
                          backgroundColor: '#ee4545',
                          color: '#000000'
                        },
                      }}
                      onClick={() => removeFavorite(selectedFavoriteId)} // Use selectedFavoriteId
                    >
                      <BookmarkRemoveIcon />
                    </Button> */}
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: '#8dd3bb',
                        color: '#000000',
                        width: '100%',
                        border: '2px solid #4c987e',
                        fontFamily: 'Montserrat, sans-serif',
                        '&:hover': {
                          backgroundColor: '#4c987e',
                          color: '#ffffff',
                        },
                      }}
                      onClick={() => {
                        if (selectedAccommodation.rooms && selectedAccommodation.rooms.length > 0) {
                          handleBookNow(selectedAccommodation.rooms[0]); // Pass the first room
                        } else {
                          setError('No rooms available for this accommodation.');
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                  
                  {/* Close Button */}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#e01a1a',
                      color: '#fff',
                      fontWeight: 700,
                      fontFamily: 'Montserrat, sans-serif',
                      '&:hover': {
                        backgroundColor: '#72b9a3',
                        color: '#000000'
                      },
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
      <Dialog
  open={openDeleteDialog}
  onClose={handleDeleteClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Delete Favorite"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to remove this accommodation from your favorites?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button 
      onClick={handleDeleteClose}
      sx={{
        color: '#000000',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleDeleteConfirm}
      color="error"
      variant="contained"
      autoFocus
      sx={{
        backgroundColor: '#e01a1a',
        '&:hover': {
          backgroundColor: '#b71c1c',
        },
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default FavoritesList;
import React, { useState } from 'react';
import './Favorites.css';
import Header from '../../Components/Header';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('places');
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({
    id: '',
    name: '',
    location: '',
    rating: '',
    reviews: '',
    amenities: '',
    price: '',
    imageCount: '',
  });
  const [isEditing, setIsEditing] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFavorite({ ...newFavorite, [name]: value });
  };

  // Add a new favorite
  const addFavorite = () => {
    setFavorites([...favorites, { ...newFavorite, id: Date.now() }]);
    setNewFavorite({
      id: '',
      name: '',
      location: '',
      rating: '',
      reviews: '',
      amenities: '',
      price: '',
      imageCount: '',
    });
  };

  // Update an existing favorite
  const updateFavorite = (id) => {
    setFavorites(
      favorites.map((favorite) =>
        favorite.id === id ? { ...newFavorite, id } : favorite
      )
    );
    setIsEditing(null);
    setNewFavorite({
      id: '',
      name: '',
      location: '',
      rating: '',
      reviews: '',
      amenities: '',
      price: '',
      imageCount: '',
    });
  };

  // Remove a favorite
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  // Start editing a favorite
  const editFavorite = (favorite) => {
    setIsEditing(favorite.id);
    setNewFavorite(favorite);
  };
  
  return (
    <div className="favorites-container">
      <Header/>
      <header className="favorites-header">
        <h1>Favorites</h1>
        <div className="tabs">
          <button
            className={activeTab === 'flights' ? 'active' : ''}
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </button>
          <button
            className={activeTab === 'places' ? 'active' : ''}
            onClick={() => setActiveTab('places')}
          >
            Places
          </button>
        </div>
      </header>

      <div className="favorite-form">
        <h3>{isEditing ? 'Edit Favorite' : 'Add New Favorite'}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newFavorite.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newFavorite.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newFavorite.rating}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="reviews"
          placeholder="Reviews"
          value={newFavorite.reviews}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={newFavorite.amenities}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newFavorite.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="imageCount"
          placeholder="Image Count"
          value={newFavorite.imageCount}
          onChange={handleInputChange}
        />
        <button onClick={isEditing ? () => updateFavorite(isEditing) : addFavorite}>
          {isEditing ? 'Update Favorite' : 'Add Favorite'}
        </button>
      </div>

      {activeTab === 'places' && favorites.length > 0 && (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="place-card">
              <div className="place-image">
                <span className="image-count">{favorite.imageCount} images</span>
              </div>
              <div className="place-info">
                <h2>{favorite.name}</h2>
                <p>{favorite.location}</p>
                <div className="place-details">
                  <span className="rating">⭐ {favorite.rating}</span>
                  <span className="reviews">Very Good {favorite.reviews} reviews</span>
                  <span className="amenities">{favorite.amenities}</span>
                </div>
                <div className="place-actions">
                  <span className="price">Starting from ${favorite.price}/night</span>
                  <button className="view-place">View Place</button>
                  <button onClick={() => editFavorite(favorite)}>Edit</button>
                  <button onClick={() => removeFavorite(favorite.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

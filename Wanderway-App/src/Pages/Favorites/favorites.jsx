import React, { useState } from 'react';
import './Favorites.css';
import Header from '../../Components/Header';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({
    acmId: '',
  });
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState(''); // New state for error message

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFavorite({ ...newFavorite, [name]: value });
    setError(''); // Reset error when input changes
  };

  // Add a new favorite
  const addFavorite = () => {
    if (!newFavorite.acmId) {
      setError('Please enter a Favorite ID'); // Show error if input is empty
      return;
    }
    setFavorites([...favorites, { ...newFavorite, id: Date.now() }]);
    setNewFavorite({
      acmId: '',
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
      acmId: '',
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
      <Header />
      <header className="favorites-header">
        <h1>Favorites</h1>
      </header>

      <div className="favorite-form">
        <h3>{isEditing ? 'Edit Favorite' : 'Add New Favorite'}</h3>
        <input
          type="number"
          name="acmId"
          placeholder="Accommodation ID"
          value={newFavorite.acmId}
          onChange={handleInputChange}
        />
        <button onClick={isEditing ? () => updateFavorite(isEditing) : addFavorite}>
          {isEditing ? 'Update Favorite' : 'Add Favorite'}
        </button>
        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}
      </div>

      {favorites.length > 0 && (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <div className="favorite-info">
                <h2>Favorite ID: {favorite.id}</h2>
                <p>Accommodation ID: {favorite.acmId}</p>
                <div className="favorite-actions">
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

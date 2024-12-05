import React, { useState } from "react";
import "./FavoritesList.css";
import Header from "../../Components/Header";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Beach Resort",
      description: "A beautiful beach resort with ocean views.",
      location: "Malibu, California",
      price: "$240/night",
      rating: "4.2",
      reviews: "371 reviews",
      amenities: "5 Star Hotel, 20+ Amenities",
      image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
      type: "places",
    },
    {
      id: 2,
      title: "Mountain Cabin",
      description: "A cozy cabin in the mountains.",
      location: "Aspen, Colorado",
      price: "$180/night",
      rating: "4.5",
      reviews: "200 reviews",
      amenities: "Cabin, Fireplace, Ski-in/Ski-out",
      image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
      type: "places",
    },
    {
      id: 3,
      title: "City Hotel",
      description: "A luxury hotel in the heart of the city.",
      location: "Colon, Cebu City",
      price: "$150/night",
      rating: "4.7",
      reviews: "500 reviews",
      amenities: "Luxury Hotel, Rooftop Pool",
      image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
      type: "places",
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const placesCount = favorites.filter((item) => item.type === "places").length;

  return (
    <div className="favorites-page">
      <Header />

      <div className="main-content">
        <h2>Favorites</h2>

        {/* Row Bar */}
        <div className="row-bar">
          <div className="tab active">
            Places
            <span className="count">{placesCount}</span>
          </div>
        </div>

        {/* Favorites List */}
        <div className="favorites-container">
          <ul className="favorites-list">
            {favorites.map((item) => (
              <li key={item.id} className="favorite-item">
                <img
                  src={item.image} // Use the new image URL here
                  alt={item.title}
                  className="favorite-image"
                />
                <div className="favorite-info">
                  <h3>{item.title}</h3>
                  <p className="location">{item.location}</p>
                  <p className="description">{item.description}</p>
                  <div className="details">
                    <span className="price">{item.price}</span>
                    <span className="rating">
                      ⭐ {item.rating} ({item.reviews})
                    </span>
                    <span className="amenities">{item.amenities}</span>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFavorite(item.id)}
                  >
                    Remove
                  </button>
                  <button className="view-button">View Place</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;

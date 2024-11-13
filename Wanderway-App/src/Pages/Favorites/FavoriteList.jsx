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
      image: "beach-resort.jpg", 
      type: "places"  
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
      image: "mountain-cabin.jpg",
      type: "places"
    },
    {
      id: 3,
      title: "City Hotel",
      description: "A luxury hotel in the heart of the city.",
      location: "New York, NY",
      price: "$300/night",
      rating: "4.7",
      reviews: "500 reviews",
      amenities: "Luxury Hotel, Rooftop Pool",
      image: "city-hotel.jpg",
      type: "places"
    },
    {
      id: 4,
      title: "Flight to Paris",
      description: "A round-trip flight to Paris.",
      location: "New York, NY",
      price: "$1200",
      rating: "4.8",
      reviews: "150 reviews",
      amenities: "Direct flight, Business Class",
      image: "flight-paris.jpg",
      type: "flights" 
    },
    {
      id: 5,
      title: "Flight to Tokyo",
      description: "A round-trip flight to Tokyo.",
      location: "Los Angeles, CA",
      price: "$1100",
      rating: "4.6",
      reviews: "200 reviews",
      amenities: "Direct flight, Economy Class",
      image: "flight-tokyo.jpg",
      type: "flights"
    }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const [activeTab, setActiveTab] = useState("places");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  
  const placesCount = favorites.filter((item) => item.type === "places").length;
  const flightsCount = favorites.filter((item) => item.type === "flights").length;

  return (
    <div className="favorites-page">
      <Header />

     
      <div className="main-content">
        <h2>Favorites</h2>
        <div className="row-bar">
          <div
            className={`tab ${activeTab === "places" ? "active" : ""}`}
            onClick={() => handleTabClick("places")}
          >
            Places
            <span className="count">{placesCount}</span> 
          </div>
          <div
            className={`tab ${activeTab === "flights" ? "active" : ""}`}
            onClick={() => handleTabClick("flights")}
          >
            Flights
            <span className="count ">{flightsCount}</span> 
          </div>
        </div>

        <div className="favorites-container">
          {activeTab === "places" && (
            <ul className="favorites-list">
              {favorites
                .filter((item) => item.type === "places")
                .map((item) => (
                  <li key={item.id} className="favorite-item">
                    <img
                      src={`/assets/${item.image}`}
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
          )}

          {activeTab === "flights" && (
            <ul className="favorites-list">
              {favorites
                .filter((item) => item.type === "flights")
                .map((item) => (
                  <li key={item.id} className="favorite-item">
                    <img
                      src={`/assets/${item.image}`}
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
                      <button className="view-button">View Flight</button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;

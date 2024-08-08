import React from 'react';
import './RestaurantCard.css'; // Ensure you add styles in this CSS file

const RestaurantCard = ({ restaurant, onClick }) => {
    return (
        <div className="restaurant-card" onClick={onClick}>
            <div className="image-container">
                <img className="restaurant-image" src={restaurant.image} alt={restaurant.name} />
            </div>
            <div className="card-content">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-description">Discover delicious vegetarian dishes and more!</p>
                <p className="restaurant-rating">Rating: {restaurant.rating}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;

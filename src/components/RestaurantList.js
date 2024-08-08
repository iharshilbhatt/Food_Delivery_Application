import React, { useContext, useState, useEffect, useCallback } from 'react';
import RestaurantCard from './RestaurantCard';
import { RestaurantContext } from '../contexts/RestaurantContext';
import PreviousOrders from './PreviousOrders';
import './RestaurantList.css'; 

const RestaurantList = () => {
    const { restaurants, setSelectedRestaurant } = useContext(RestaurantContext);
    const [filteredRestaurants, setFilteredRestaurants] = useState([...restaurants]);
    const [ratingFilter, setRatingFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrder, setShowOrder] = useState(false);
    const [loading, setLoading] = useState(false);

    const filterRestaurants = useCallback(() => {
        let filtered = restaurants;

        if (ratingFilter) {
            filtered = filtered.filter((restaurant) => restaurant.rating >= parseFloat(ratingFilter));
        }

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(searchLower)
            );
        }

        setFilteredRestaurants(filtered);
    }, [restaurants, ratingFilter, searchTerm]);

    useEffect(() => {
        setLoading(true);
        filterRestaurants();
        setLoading(false);
    }, [filterRestaurants]);

    const handleRestaurantClick = (restaurantId) => {
        setSelectedRestaurant(restaurants.find((restaurant) => restaurant._id === restaurantId));
    };

    const handleRatingChange = (e) => {
        setRatingFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleShow = () => {
        setShowOrder(!showOrder);
    };

    const handleClearFilters = () => {
        setRatingFilter('');
        setSearchTerm('');
        setFilteredRestaurants(restaurants);
    };

    return (
        <div className="restaurant-list-container">
            <h2 className="header">Discover Delicious Meals</h2>
            <div className="filter-container">
                <div className="filter-card">
                    <label htmlFor="rating" className="filter-label">Filter by Rating</label>
                    <input
                        type="number"
                        id="rating"
                        value={ratingFilter}
                        onChange={handleRatingChange}
                        className="filter-input"
                        placeholder="Min Rating"
                    />
                </div>
                <div className="filter-card">
                    <label htmlFor="search" className="filter-label">Search by Name</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="filter-input"
                        placeholder="Search..."
                    />
                </div>
                <button onClick={handleClearFilters} className="clear-filters-btn">
                    Clear Filters
                </button>
                <button onClick={handleShow} className="previous-orders-btn">
                    Previous Orders
                </button>
            </div>
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <div className="restaurant-card-container">
                    {filteredRestaurants.length ? (
                        filteredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant._id}
                                restaurant={restaurant}
                                onClick={() => handleRestaurantClick(restaurant._id)}
                            />
                        ))
                    ) : (
                        <p className="no-restaurants-text">No restaurants found.</p>
                    )}
                </div>
            )}
            {showOrder && <PreviousOrders handleShow={handleShow} />}
        </div>
    );
};

export default RestaurantList;

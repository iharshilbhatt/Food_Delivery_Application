import React, { useContext } from 'react';
import DishCard from './DishCard';
import { RestaurantContext } from '../contexts/RestaurantContext';
import './DishesMenu.css'; // Assuming you'll add CSS for custom styling

const DishesMenu = ({ onOrderComplete }) => {
    const { selectedRestaurant } = useContext(RestaurantContext);

    if (!selectedRestaurant) {
        return <p className="loading-text">Loading restaurant details...</p>;
    }

    const handleOrderCompletion = () => {
        if (onOrderComplete) {
            onOrderComplete();
        }
    };

    return (
        <div className="menu-container">
            <h2 className="menu-title">Menu</h2>
            {selectedRestaurant.menu.length > 0 ? (
                <div className="dishes-grid">
                    {selectedRestaurant.menu.map((dish) => (
                        <DishCard key={dish._id} dish={dish} />
                    ))}
                </div>
            ) : (
                <p className="no-dishes-text">No dishes available at the moment.</p>
            )}
            <button className="complete-order-button" onClick={handleOrderCompletion}>
                Complete Order
            </button>
        </div>
    );
};

export default DishesMenu;

import React, { useContext } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

const DishCard = ({ dish }) => {
    const { cartItems, handleAddItems, handleRemoveItems } = useContext(RestaurantContext);

    // Find the quantity of the current dish in the cart
    const cartItem = cartItems.find(item => item._id === dish._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        handleAddItems(dish);
    };

    const handleRemove = () => {
        if (quantity > 0) {
            handleRemoveItems(dish);
        }
    };

    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <img src={dish.image} alt={dish.name} style={{ width: '100%', height: 'auto' }} />
            <p>Price: Rs{dish.price}</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px"
                }}
            >
                <button onClick={handleAdd}>+</button>
                <span>{quantity}</span>
                <button onClick={handleRemove} disabled={quantity === 0}>-</button>
            </div>
        </div>
    );
};

export default DishCard;

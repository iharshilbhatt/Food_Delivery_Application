import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:5000/restaurants");
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error.message);
            }
        };

        fetchRestaurants();
    }, []);

    const handleAddItems = (dish) => {
        console.log("Dish:", dish);

        const existingItemIndex = cartItems.findIndex(item => item._id === dish._id);

        if (existingItemIndex !== -1) {
            console.log("Dish already exists in the cart. Updating quantity.");
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + 1,
            };

            setTotalPrice(prev => prev + dish.price);
            setCartItems(updatedCartItems);
        } else {
            console.log("Dish does not exist in the cart. Adding to the cart.");
            setCartItems([...cartItems, { ...dish, quantity: 1 }]);
            setTotalPrice(prev => prev + dish.price);
        }
    };

    const handleRemoveItems = (dish) => {
        console.log("Dish ID to remove:", dish);

        const existingItemIndex = cartItems.findIndex(item => item._id === dish._id);

        if (existingItemIndex !== -1) {
            console.log("Dish exists in the cart. Updating quantity or removing.");
            const updatedCartItems = [...cartItems];

            if (updatedCartItems[existingItemIndex].quantity > 1) {
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedCartItems[existingItemIndex].quantity - 1,
                };
                setTotalPrice(prev => prev - dish.price);
            } else {
                const itemPrice = updatedCartItems[existingItemIndex].price;
                updatedCartItems.splice(existingItemIndex, 1);
                setTotalPrice(prev => prev - itemPrice);
            }

            setCartItems(updatedCartItems);
        } else {
            console.log("Dish does not exist in the cart.");
        }
    };

    const emptyCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    };

    const value = {
        restaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        handleAddItems,
        handleRemoveItems,
        cartItems, // Ensure this is included
        totalPrice,
        emptyCart,
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };

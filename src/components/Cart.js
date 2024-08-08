import React, { useContext, useState } from "react";
import axios from "axios";
import { RestaurantContext } from "../contexts/RestaurantContext";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs
import "./Cart.css"; 

const Cart = () => {
    const { totalPrice, emptyCart } = useContext(RestaurantContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const generateOrderId = () => {
        // Generate a unique order ID using uuid
        return uuidv4();
    };

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);
            setErrorMessage(""); // Clear any previous error messages

            const orderId = generateOrderId();

            // Post order data to backend
            const response = await axios.post(
                "http://localhost:5000/previousOrders",
                {
                    orderId,
                    dateOfOrder: new Date(),
                    amount: totalPrice,
                }
            );

            console.log(response.data);
            emptyCart();
            // Redirect or show a success message
        } catch (error) {
            console.error("Error during checkout:", error.message);
            setErrorMessage("There was an error during checkout. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            <div className="cart-content">
                <div className="price-section">
                    <span className="price-label">Total Price:</span>
                    <span className="price-amount">Rs {totalPrice}</span>
                </div>
                <button className="checkout-button" onClick={handleCheckout} disabled={isCheckingOut}>
                    {isCheckingOut ? "Checking out..." : "Checkout"}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Cart;

import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import DishesMenu from './components/DishesMenu';
import Cart from './components/Cart';
import { RestaurantContext } from './contexts/RestaurantContext';
import LoginPage from './pages/LoginPage';
import './App.css';

const App = () => {
    const { selectedRestaurant } = useContext(RestaurantContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate data fetching
                setLoading(false);
            } catch (err) {
                setError("Failed to load data. Please try again.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (orderCompleted) {
            const timer = setTimeout(() => {
                setOrderCompleted(false); // Reset orderCompleted state
                // Redirect to home page
                window.location.href = '/';
            }, 5000); // Redirect after 5 seconds

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [orderCompleted]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const completeOrder = () => {
        setOrderCompleted(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <div className="app-container">
                                <header className="app-header">
                                    <h1 className="app-title">Gourmet Delights</h1>
                                    <div className="header-right">
                                        <button className="logout-button" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                </header>
                                <main className="app-main">
                                    {loading && <p className="loading-message">Loading...</p>}
                                    {error && <p className="error-message">{error}</p>}
                                    {!loading && !error && (
                                        <div className="main-content">
                                            <div className="restaurant-section">
                                                <RestaurantList />
                                            </div>
                                            <div className="menu-section">
                                                {selectedRestaurant ? (
                                                    <DishesMenu onOrderComplete={completeOrder} />
                                                ) : (
                                                    <p className="select-restaurant-message">
                                                        Select a restaurant to view its delicious menu.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </main>
                                <footer className="app-footer">
                                    <Cart className="cart-icon" />
                                </footer>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

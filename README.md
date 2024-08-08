# Food_Delivery_Application
The Food Delivery Application is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to browse vegetarian restaurants, view menus, manage their cart, place orders, and review previous orders. It also features a secure login system to access personalized content.
<h2>Features</h2>
    <ul>
        <li><strong>Restaurant List</strong>:
            <ul>
                <li>Browse a list of vegetarian restaurants.</li>
                <li>Filter restaurants by rating.</li>
                <li>Search for restaurants by name.</li>
            </ul>
        </li>
        <li><strong>Menu</strong>:
            <ul>
                <li>View detailed menus of selected restaurants.</li>
                <li>Add dishes to the cart.</li>
                <li>Complete the order process with a confirmation.</li>
            </ul>
        </li>
        <li><strong>Cart Management</strong>:
            <ul>
                <li>Add or remove items from the cart.</li>
                <li>View the total price of selected items.</li>
            </ul>
        </li>
        <li><strong>Previous Orders</strong>:
            <ul>
                <li>View a list of previous orders with details.</li>
                <li>View order ID, items, total amount, and order date.</li>
            </ul>
        </li>
        <li><strong>Authentication</strong>:
            <ul>
                <li>Secure login for users with credentials.</li>
                <li>Automatic redirection upon successful login.</li>
            </ul>
        </li>
        <li><strong>Responsive Design</strong>:
            <ul>
                <li>A user-friendly interface that adapts to both desktop and mobile devices.</li>
            </ul>
        </li>
    </ul>
    
  <h2>Technologies Used</h2>
    <ul>
        <li><strong>Frontend</strong>:
            <ul>
                <li>React</li>
                <li>React Router DOM</li>
                <li>CSS for styling</li>
            </ul>
        </li>
        <li><strong>Backend</strong>:
            <ul>
                <li>Node.js</li>
                <li>Express.js</li>
            </ul>
        </li>
        <li><strong>Database</strong>:
            <ul>
                <li>MongoDB</li>
            </ul>
        </li>
        <li><strong>Other</strong>:
            <ul>
                <li>Axios for HTTP requests</li>
            </ul>
        </li>
    </ul>

  <h2>Installation</h2>

<h3>Prerequisites</h3>
    <ul>
        <li>Node.js (v14.x or later)</li>
        <li>npm (v6.x or later)</li>
        <li>MongoDB (running locally or via MongoDB Atlas)</li>
    </ul>

<h3>Setup</h3>
    <ol>
        <li><strong>Clone the Repository:</strong>
            <pre><code>git clone https://github.com/iharshilbhatt/Food_Delivery_Application.git</code></pre>
        </li>
        <li><strong>Navigate to the Project Directory:</strong>
            <pre><code>cd food-delivery-app</code></pre>
        </li>
        <li><strong>Install Backend Dependencies:</strong>
            <ol>
                <li>Navigate to the <code>backend</code> directory:
                    <pre><code>cd backend</code></pre>
                </li>
                <li>Install the dependencies:
                    <pre><code>npm install</code></pre>
                </li>
            </ol>
        </li>
        <li><strong>Install Frontend Dependencies:</strong>
            <ol>
                <li>Navigate to the <code>client</code> directory:
                    <pre><code>cd ../client</code></pre>
                </li>
                <li>Install the dependencies:
                    <pre><code>npm install</code></pre>
                </li>
            </ol>
        </li>
        <li><strong>Configure Environment Variables:</strong>
            <p>Create a <code>.env</code> file in the <code>backend</code> directory with the following content:</p>
            <pre><code>MONGO_URI=your_mongodb_connection_string
PORT=5000</code></pre>
            <p>Replace <code>your_mongodb_connection_string</code> with your MongoDB connection string.</p>
        </li>
        <li><strong>Start the Application:</strong>
            <ol>
                <li>Start the backend server:
                    <pre><code>cd backend
npm start</code></pre>
                </li>
                <li>Start the frontend development server:
                    <pre><code>cd ../client
npm start</code></pre>
                </li>
            </ol>
            <p>The frontend will be available at <code>http://localhost:3000</code> and the backend at <code>http://localhost:5000</code>.</p>
        </li>
    </ol>
    <h2>Usage</h2>
    <ol>
        <li><strong>Access the Application:</strong>
            <p>Open your web browser and navigate to <code>http://localhost:3000</code>.</p>
        </li>
        <li><strong>Login:</strong>
            <p>Use the default credentials:</p>
            <ul>
                <li><strong>Username</strong>: <code>user</code></li>
                <li><strong>Password</strong>: <code>password</code></li>
            </ul>
            <p>You can change these credentials in the <code>LoginPage.jsx</code> file.</p>
        </li>
        <li><strong>Explore Restaurants:</strong>
            <p>Use the search bar and rating filter to find vegetarian restaurants. Click on a restaurant to view its menu.</p>
        </li>
        <li><strong>View Menu and Place Orders:</strong>
            <p>Browse through the menu of the selected restaurant. Add dishes to your cart and complete the order process.</p>
        </li>
        <li><strong>View Previous Orders:</strong>
            <p>Click on "Previous Orders" to review past orders.</p>
        </li>
    </ol>

  <h2>Folder Structure</h2>
    <pre><code>food-delivery-app

├── backend
│   ├── node_modules
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── restaurants.json
│   └── server.js
│
├── client
│   ├── node_modules
│   ├── public
│   │   ├── favicon.ico
│   │   ├── image.png
│   │   ├── index.html
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── src
│   │   ├── components
│   │   │   ├── Cart.css
│   │   │   ├── Cart.js
│   │   │   ├── DishCard.js
│   │   │   ├── DishesMenu.css
│   │   │   ├── DishesMenu.js
│   │   │   ├── PreviousOrders.js
│   │   │   ├── RestaurantCard.css
│   │   │   ├── RestaurantCard.js
│   │   │   ├── RestaurantList.css
│   │   │   └── RestaurantList.js
│   │   ├── contexts
│   │   │   └── RestaurantContext.js
│   │   ├── pages
│   │   │   ├── LoginPage.css
│   │   │   ├── LoginPage.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── images
│   └── The Royal Thali.jpeg
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
</code></pre>


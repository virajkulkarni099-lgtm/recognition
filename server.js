const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express app
const app = express();
const PORT = 3000;

// --- Mock Data and Configuration ---

// Mock Credentials (Replace with actual database lookups in a production app)
const MOCK_USERNAME = 'user';
const MOCK_PASSWORD = 'password';

// Middleware setup
// 1. Use body-parser to parse form submissions (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// 2. Serve static files from the directory where server.js is located
// This allows the browser to find login.html, dashboard.html, and dashboard.css
app.use(express.static(path.join(__dirname)));

// --- Routes ---

// Root route redirects to login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

/**
 * POST /login
 * Handles the submission from the login.html form.
 */
app.post('/login', (req, res) => {
    // req.body contains the form data (username, password)
    const { username, password } = req.body;

    // Simulate basic authentication check
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
        // Successful login: Redirect to the dashboard
        console.log(`User ${username} logged in successfully. Redirecting to dashboard.html.`);
        
        // In a real app, you would establish a session (e.g., using JWT or cookies) here.
        res.redirect('/dashboard.html');
    } else {
        // Failed login: Send an error response
        console.log(`Login failed for user ${username}. Invalid credentials.`);
        
        // In a more complex app, you'd redirect back to login.html with a query parameter
        // to display an error message.
        res.status(401).send(`
            <h1>Login Failed</h1>
            <p>Invalid username or password. Please <a href="/login.html" style="color: blue;">try again</a>.</p>
        `);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`
---------------------------------------------------
  CBR Server running at http://localhost:${PORT}
  Mock Credentials: ${MOCK_USERNAME} / ${MOCK_PASSWORD}
---------------------------------------------------
  To run this server:
  1. Ensure 'login.html' and 'dashboard.html' are in the same folder.
  2. Install dependencies: npm install express body-parser
  3. Run the file: node server.js
---------------------------------------------------
    `);
});

const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for requests from your React app
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to match your React app's origin
};
app.use(cors(corsOptions));

// Example route to handle fetch requests from your React app
app.post('/api', async (req, res) => {
    try {
      const userInput = req.query.banId; // Retrieve banId from query parameters
      console.log(`Request received | Date: ${new Date()} | IP: ${req.socket.remoteAddress} | BanID: ${userInput}`);
      console.log()
      const response = await fetch('https://faas.possumkorps.org/function/ban-lookup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "banID": userInput }), // Use banId to construct the request body
      });
      const responseBody = await response.text(); // Get the response body as text
      console.log('Response body:', responseBody); // Log the response body
      const data = JSON.parse(responseBody); // Parse the response body as JSON
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve the Vite React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
  
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
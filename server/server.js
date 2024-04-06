const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.url}`);
  next();
});

// Enable CORS for requests from your React app
const corsOptions = {
  origin: '*', // Adjust this to match your React app's origin
  credentials: true, 
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
      // console.log('Response body:', responseBody); // <--- Log the response body (whole json from api)
      const data = JSON.parse(responseBody); // Parse the response body as JSON
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
  console.log(`\x1b[31m                                                                      
 _____ _____ _____ _____ _____    __    _____ _____ _____ __    __    
|   | |     |   __|  |  |_   _|  |  |  |     |  |  |   __|  |  |  |   
| | | |-   -|  |  |     | | |    |  |__|  |  |  |  |   __|  |__|  |__ 
|_|___|_____|_____|__|__| |_|    |_____|_____|\___/|_____|_____|_____|
                                                                         \x1b[0m`)
console.log(`\x1b[32m[LOG]\x1b[0m Server is alive on port: ${PORT}`)
})                                                                                                                                                

projectData = {};

const port = 8080;

// Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require('body-parser');


const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
app.listen(port, () => {
  console.log(`Server is runnin on ${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Post Route
app.post('/weatherData', postData);

function 
postData(req, res) {
  projectData.temp = req.body.temp;
  projectData.weatherDetails = req.body.weatherDetails;
  projectData.weatherIcons = req.body.weatherIcons;
  projectData.date = req.body.date;
  projectData.userFeelings = req.body.userFeelings;
  res.end();
  console.log(projectData);
}

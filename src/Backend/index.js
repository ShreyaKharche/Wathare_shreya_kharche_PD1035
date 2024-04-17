const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To enable CORS for frontend requests

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Connect to MongoDB using the connection string
mongoose.connect('<your_mongodb_connection_string>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define your data schema (replace with your actual data structure)
const DataSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  sample: { type: Number, required: true },
});

const Data = mongoose.model('Data', DataSchema);

// Enable CORS for frontend requests
app.use(cors());

// API endpoint to get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// (Optional) API endpoint to filter data based on start time and frequency (implement logic here)
app.get('/api/data/filter', async (req, res) => {
  const { startTime, frequency } = req.query;
  // Implement filtering logic based on startTime and frequency (e.g., using moment.js)
  // Filter data in the database and send the filtered data back

  try {
    const filteredData = await Data.find(/* Your filtering criteria */);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error filtering data' });
  }
});

// (Optional) API endpoint to fetch weather data (implement logic using axios and OpenWeatherMap API)
app.get('/api/weather', async (req, res) => {
  const { location } = req.query; // Get location from query parameter
  const apiKey = '<your_openweathermap_api_key>'; // Replace with your API key

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{location\}&appid\=</span>{apiKey}`);
    res.json(response.data); // Send weather data back
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
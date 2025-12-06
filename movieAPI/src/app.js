const express = require('express');
const cors = require('cors');
const movieRoutes = require('./v1/Routes/movieRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routesa
app.use('/api/v1/movies', movieRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

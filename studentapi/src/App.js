const express = require('express');
const cors = require('cors');
const studentRoutes = require('./v1/Routes/studentRoutes');

const app = express();

//middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

//sett opp route
app.use('/api/students', studentRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
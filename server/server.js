const express = require('express');
const app = express();
const cors = require('./middleware/cors');
const dotenv = require('dotenv');
const path = require('path');

//* Server port 
const PORT = process.env.PORT || 7771

//* Initialize dotenv
dotenv.config()

//* Middleware
app.use(cors)

//* API routes
app.use('/api/banks', require(path.join(__dirname, 'routes', 'api/banks')))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
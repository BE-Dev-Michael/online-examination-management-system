const express = require('express');
const app = express();
const cors = require('./middleware/cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/db')

//* Initialize dotenv
dotenv.config()

//* Server port 
const PORT = process.env.PORT || 7771

//* Connect to MongoDB
connectDatabase()

//* Middleware
app.use(cors)
app.use(express.json())

//* API routes
app.use('/api/users', require(path.join(__dirname, 'routes', 'api/users')))
app.use('/api/banks', require(path.join(__dirname, 'routes', 'api/banks')))
app.use('/api/exams', require(path.join(__dirname, 'routes', 'api/exams')))
app.use('/api/reports', require(path.join(__dirname, 'routes', 'api/reports')))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
const express = require('express');
const app = express();
const cors = require('./middleware/cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 7771

//* Initialize dotenv
dotenv.config()

//* Middleware
app.use(cors)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
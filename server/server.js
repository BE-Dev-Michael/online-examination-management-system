const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 7771

//* Initialize dotenv
dotenv.config()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
const cors = require('cors');

//* Cross Origin Resource Sharing (CORS)
//* This enables React frontend to access APIs from backend
const config = {
    //* origin is the domain where the request comes from
    //* change the domain if this will be deployed in hosting site e.g. Heroku
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

module.exports = cors(config)
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});   // configuring the environment file for securing the database password 
require('./db/db_connection');  // connecting with the database 
app.use(express.json());    // used to convert the data to json
app.use(require('./router/auth'));

const User = require('./model/userSchema');

const PORT = process.env.PORT;  // importing the port number from the config.env file 

// starting the server on specified port 
app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
});
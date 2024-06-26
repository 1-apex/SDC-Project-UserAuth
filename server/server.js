require('dotenv').config(); 
const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connect_DB = require('./utils/db');

app.use(express.json());
app.use('/api/auth', router);

const PORT = 5000;

connect_DB().then(()=> {  
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
})

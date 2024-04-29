
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log("Connection with database successful");
}).catch((err) => { console.log("Error connecting the database" + err); })

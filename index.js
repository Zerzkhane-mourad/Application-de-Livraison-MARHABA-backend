const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();



const port = process.env.PORT ;

app.use(express.json())
app.use(cookieParser())


const router = require('./routes/user')
app.use('/', router)



mongoose.connect('mongodb://localhost/User')
    .then(() => console.log("connect to database"))
    .catch(() => console.log("error connecting   to database"))


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});



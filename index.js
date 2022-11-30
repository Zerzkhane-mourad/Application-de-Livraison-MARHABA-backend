const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();


const port = process.env.PORT ;


app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors());


const router = require('./routes/user');
app.use('/', router)



mongoose.connect('mongodb+srv://mourad:mourad@livraison-marhaba.njt0yab.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("connect to database"))
    .catch(() => console.log("error connecting   to database"))


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

module.exports = app ;
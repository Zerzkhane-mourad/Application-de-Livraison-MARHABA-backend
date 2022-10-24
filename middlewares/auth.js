const expressJWT = require('express-jwt');
const User = require('../models/Usermodels')
require('dotenv').config();

exports.requireSignIn = expressJWT({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})


exports.chekrole = (req, res) => {
    if (req.auth.role == "manager") {
        return res.send('acces manager')
    } else if (req.auth.role == "client") {
        return res.send('acces cleint')
    } else if (req.auth.role == "livreur") {
        return res.send('acces livreur')
    } else {
        return res.send('acces unknown')
    }

}


const User = require('../models/Usermodels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { transporter } = require('../helpers/config')


const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const chekemail = await User.findOne({ email: req.body.email })

    if (chekemail){
    return res.status(400).json({
        error: 'Email ealrdy exist'
    })
    } else {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            role: 'client',
            password: hashPassword
        })
        try {
            res.send(user)

        } catch {
            res.send('error creating')
        }
    }
}


const login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user)
    return res.status(400).json({
        error: 'Email Not Found'
    })

    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) 
    return res.status(400).json({
        error: 'Password Not Found'
    })

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET)
    res.cookie('token', token)
    const { _id, username, email, role } = user;
    return res.status(200).send({
        token, user: { _id, username, email, role }
    })


}

const forgetpassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({
             error: 'Not found user with this email' 
            
            })
    } else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_RESET, { expiresIn: 3600 });
        const {email} = user;
        transporter.sendMail({
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Réinitialisation de mot de passe pour votre compte Marhaba",
            html: `<p>cliquer sur ce <a href="http://localhost:3000/resetpassword/${token}">lien</a> pour réinitialiser votre mot de passe de votre compte Marhaba</p>`
        })
       
            .then(() => { res.send({token, user: {email}}) })
            .catch((error) => { res.send(error) })
    }
}



const resetpassword = async (req, res) => {

    const user = jwt.verify(req.params.token, process.env.TOKEN_SECRET_RESET)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    User.findByIdAndUpdate(user._id, { password: hashPassword })
        .then(() => { res.send('password updated') })
        .catch(() => { res.send('not update') })
}


const signout = (req, res) => {

    res.clearCookie('token');

    res.send('User signed out')

}


module.exports = { createUser, login, signout, forgetpassword, resetpassword }
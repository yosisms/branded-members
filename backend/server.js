require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

mongoose.connect('mongodb://localhost:27017/branded',  {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Must add username.']
    },
    password: {
        type: String,
        required: [true, 'Must add password.']
    },
    email: {
        type: String,
        required: [true, 'Must add email.']
    },
    firstName: {
        type: String,
        required: [true, 'Must add first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Must add last name.']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Must add date']
    }
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', (req, res) => {
    User.find({}, {password: 0},(err, respond) => {
    if(err){
        console.log(err)
    } else {
        res.json(respond);
    }
});
})

app.post('/api/users/register', (req,res) => {
    req.body.username = req.body.username.toLowerCase();
    User.findOne({username: req.body.username}, (err, respond) => {
        err && console.log(err);
        if(respond) {
            res.json({isValid: false, message: 'username is taken.'});
        } else {
            const newUser = new User (req.body);
            newUser.save();
            res.json({isValid: true})

            const mailOption = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Branded Members successfully registered',
                text: `Hello ${req.body.firstName}! \n Welcome to Branded Members. Your account was successfully created! `
            }

            transporter.sendMail(mailOption, (err, data) => {
                if (err) {
                    console.log('email error!')
                } else {
                    console.log('email sent!')
                }
            })
        }
    })
    
})

app.post('/api/users/login', (req, res) => {
    req.body.username = req.body.username.toLowerCase();
    User.findOne({username: req.body.username, password: req.body.password}, {password: 0} , (err, respond) => {
        if(respond) {
            res.json(respond);
        } else {
            res.json({isValid: false});
        }
    })
})

app.listen(3001, ()=>console.log('Backend server is running on port 3001.'))
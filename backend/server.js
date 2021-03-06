require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { request } = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const urlEncodedFalse = bodyParser.urlencoded({extended: false});
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

mongoose.connect(process.env.DB_PATH,  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema ({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api/users', (req, res) => {
    if (req.isAuthenticated()) {
        User.find({}, {password: 0},(err, respond) => {
            if(err){
                console.log(err)
            } else {
                res.json(respond);
            }
        });
    } else {
        res.send([]);
    }
})

app.post('/api/users/register', urlEncodedFalse ,[
    check('firstName', 'Must enter a first name.')
        .exists()
        .isLength({min: 1}),
    check('lastName', 'Must enter a last name.')
        .exists()
        .isLength({min: 1}),
    check('username', 'Username must be between 6 to 10 characters.')
        .exists()
        .isLength({ min: 6, max: 10 }),
    check('email', 'Email is not valid.')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password must be between 4 to 8 characters.')
        .exists()
        .isLength({ min: 4, max: 8}),
    check('dateOfBirth', 'Date of birth not valid.')
        .exists()
        .isISO8601('yyyy-mm-dd')
], (req,res) => {

    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const requestBody = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth
        }
        User.register(requestBody, req.body.password, (err, user) => {
            if(err) {
                console.log('error');
                res.send([{
                    isValid: false,
                    msg: 'Username is taken.',
                    param: 'username'
                }]);
            } else {
                passport.authenticate('local')(req, res, () => {
                    const mailOption = {
                        from: process.env.EMAIL,
                        to: req.body.email,
                        subject: 'Branded Members successfully registered',
                        text: `Hello ${req.body.firstName}! \n Welcome to Branded Members. Your account was successfully created! `
                    }
                    
                    transporter.sendMail(mailOption, (err, data) => {
                        if (err) {
                            console.log('email error!', err)
                        } else {
                            console.log('email sent!')
                        }
                    })
                    res.json(null)
                })
            }
        })
    } else {
        res.json(errors.errors);
    }
})

app.post('/api/login', (req, res) => {
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send(true);
            })
        }
    })
})

app.post("/checkAuthentication", (req, res) => {
    const authenticated = req.user;
    if(authenticated) {
        res.status(200).json({
            authenticated,
        });
    }
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.listen(3001, ()=>console.log('Backend server is running on port 3001.'))
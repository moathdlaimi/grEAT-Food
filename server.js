// ===================
// DEPENDENCIES
// ===================
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride  = require('method-override');
const session = require('express-session');

const app = express ();
const db = mongoose.connection;
require('dotenv').config();

// ===================
// PORT
// ===================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

// ===================
// DATABASE
// ===================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , useCreateIndex:true });


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// ===================
// MIDDLEWARE
// ===================

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
// if I need to connect to an API returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.json());

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)


// ===================
// CONTROLLERS
// ===================

const foodController = require('./controllers/food.js')
app.use('/foods', foodController)

const userController = require('./controllers/user.js')
app.use('/users', userController)

const sessionController = require('./controllers/session.js')
app.use('/sessions', sessionController)

//localhost:3000
app.get('/' , (req, res) => {
  res.render('main.ejs',{ currentUser:req.session.currentUser});
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

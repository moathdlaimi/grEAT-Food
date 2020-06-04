// ===================
// DEPENDENCIES
// ===================
const bcrypt = require('bcrypt');
const express = require('express');
const user = express.Router();
const User = require('../models/user.js');

// ===================
// ROUTES
// ===================

user.get('/new', (req,res) => {
  res.render('users/new.ejs', {currentUser: req.session.currentUser})
})


user.post('/', (req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10))

  User.create(req.body, (err,userCreated) => {
    if (err) {
      console.log(err);
    }else {
      res.redirect('/foods')
    }
  })
})

module.exports = user;

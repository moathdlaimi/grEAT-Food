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


user.get('/:id', (req,res) => {
  User.findById(req.session.currentUser, (err,data) => {
    res.render(
      'users/profile.ejs',
      {
        user:data,
        currentUser: req.session.currentUser

      }

    )
  })
})



user.post('/', (req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10))

  User.create(req.body, (err,userCreated) => {
    if (err) {
      console.log(err);
    }else {
      console.log('user created');
      res.redirect('sessions/new')
    }
  })
})

module.exports = user;

const bcrypt = require('bcrypt');
const express = require('express');
const session = express.Router();
const User = require('../models/user.js');


session.get('/new', (req,res) => {
  res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})


session.post('/', (req,res) => {
  User.findOne({username:req.body.username}, (err,foundUser) => {
    if(err){
      console.log(err);
      res.send('Database is mad')
    } else if (!foundUser) {
      res.send('<a href="/"> username not found </>')
    } else {

      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.render('users/profile.ejs' ,
      {
        currentUser: req.session.currentUser
      })

      } else {
        res.send('<a href="/">Wrong Password</a')
      }
    }
  })
})


session.delete('/', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/foods')
  })
})


module.exports = session;

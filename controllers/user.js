// ===================
// DEPENDENCIES
// ===================
const bcrypt = require('bcrypt');
const express = require('express');
const user = express.Router();
const User = require('../models/user.js');
const Food = require('../models/food.js');




// ===================
// MIDDLEWARES
// ===================
const isAuthinticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next()
  }else {
    res.send('you need to sign in ')
  }
}


// ===================
// ROUTES
// ===================
user.delete('/:id',isAuthinticated,(req,res) => {
  req.session.destroy() 
  User.findByIdAndRemove(req.params.id, (err,foundUser) => {
    const recepiesIds = []
    for (var i = 0; i < foundUser.recipes.length; i++) {
        recepiesIds.push(foundUser.recipes[i]._id)
    }
    Food.remove(
      {
        _id: { $in: recepiesIds}
      },
      (err,data) => {
        res.redirect('/users')
      })
  })
})


user.get('/new', (req,res) => {
  res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

user.get('/:id', (req,res) => {
    User.findById(req.params.id, (err,foundUser) => {
        res.render('users/profile.ejs',
        {
          user:foundUser,
          currentUser: req.session.currentUser
        })
    })
})


user.get('/', (req,res) => {
  User.find({}, (err,foundUser) => {
    res.render(
      'users/index.ejs',
      {
        user:foundUser,
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

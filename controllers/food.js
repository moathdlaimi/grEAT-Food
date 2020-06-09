// ===================
// DEPENDENCIES
// ===================
const express = require('express');
const food = express.Router();
const Food = require('../models/food.js')
const User = require('../models/user.js')


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

// =====
// new.ejs
// =====

food.get('/new', (req,res) => {
  User.find({}, (err,allUsers) => {
    res.render('foods/new.ejs',
    {
      currentUser: req.session.currentUser,
      user:allUsers
    })
  })
})



// =====
// Edit.ejs
// =====

food.get('/:id/edit', isAuthinticated, (req,res) => {
  Food.findById(req.params.id, (err,data) => {
    res.render('foods/edit.ejs',
    {
      food:data,
      currentUser: req.session.currentUser
    }
  )
  })
})


// =====
// Delete
// =====

// food.delete('/:id',isAuthinticated, (req,res) => {
//   Food.findByIdAndRemove(req.params.id, (err,foundRecepie) => {
//     console.log(foundRecepie)
//     User.findOne(req.session.currentUser, (err,foundUser)=>{
//       console.log(foundUser)
//       console.log(req.session.currentUser)
//       res.redirect('/foods')
//     })
//   })
// })

food.delete('/:id',isAuthinticated, (req,res) => {
  Food.findByIdAndRemove(
    req.params.id,(err,deletedRecipie) => {
      User.findOne({'recipes._id':req.params.id}, (err,foundUser) =>{
          foundUser.recipes.id(req.params.id).remove()
          foundUser.recipes.remove(deletedRecipie)
          foundUser.save((err,data) => {
            res.redirect('/foods/')
          })
        })
      })
    })

// =====
// show.ejs
// =====

food.get('/:id', (req,res) => {
    Food.findById(req.params.id, (err,data) => {
      User.findOne({'recipes._id':req.params.id}, (err,foundUser) =>{

        res.render(
          'foods/show.ejs',
            {
              food:data,
              user:foundUser,
              currentUser: req.session.currentUser
            })
          })
        })
      })
      // =====
      // Add to fav
      // =====
      //
      // food.put('/:id/like',isAuthinticated, (req,res) => {
      //   Food.findById(
      //     req.params.id,
      //     (err,addedrecipe) => {
      //       User.findOne({'recipes._id':req.params.id}, (err,foundUser) =>{
      //           foundUser.favs.push(addedrecipe)
      //           foundUser.save((err,data) => {
      //             res.redirect('/foods/'+req.params.id)
      //           })
      //         })
      //       })
      //     })
// =====
// Update
// =====

food.put('/:id',isAuthinticated, (req,res) => {
  Food.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err,updatedRecepie) => {
      User.findOne({'recipes._id':req.params.id}, (err,foundUser) =>{
          foundUser.recipes.id(req.params.id).remove()
          foundUser.recipes.push(updatedRecepie)
          foundUser.save((err,data) => {
            res.redirect('/foods/'+req.params.id)
          })
        })
      })
    })

// =====
// Create inside user
// =====

food.post('/',isAuthinticated, (req,res) => {
  User.findById(req.body.userId, (err,foundUser) => {
    console.log(req.body.name);
    Food.create(req.body, (err,recipe) => {
      console.log('XX');
      foundUser.recipes.push(recipe);
      foundUser.save((err,data) => {
        res.redirect('/foods')
      })

    })
  })
})




// =====
// Index.ejs
// =====
food.get('/', (req,res) => {
  Food.find({}, (err,data) => {
    res.render(
      'foods/index.ejs',
      {
        food:data,
        currentUser: req.session.currentUser
      }
    )
  })
})



module.exports = food;

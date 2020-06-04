// ===================
// DEPENDENCIES
// ===================
const express = require('express');
const food = express.Router();
const Food = require('../models/food.js')


// ===================
// MIDDLEWARES
// ===================

// ===================
// ROUTES
// ===================
// =====
// SEED DATA
// =====
food.get('/seed', (req,res) => {
  Food.create(
    [
      {
        name:'Manasf',
        img:'https://burmaspice.com/wp-content/uploads/2018/09/Burma-Spice-Middle-Eastern-Levant-Jordanian-Recipe-Mansaf-web-res.jpg',
        ingredients:'Rice And Lamb',
        cuisine: 'MiddleEastren',
        instructions:'Just like that',
        notes: 'Eat with your hand',
        diet:'Halal'

      }
    ],
    (err,data) => {
      res.redirect('/foods')
    }
  )
})

// =====
// show.ejs
// =====

food.get('/:id', (req,res) => {
    Food.findById(req.params.id, (err,data) => {
      res.render(
        'foods/show.ejs',
          {
            food:data
            // ,currentUser: req.session.currentUser
          }
        )
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
        food:data
        // ,currentUser: req.session.currentUser
      }
    )
  })
})



module.exports = food;

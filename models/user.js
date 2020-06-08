const mongoose = require('mongoose');
const Recipes = require('./food.js')

const userSchema = new mongoose.Schema(
  {
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    recipes:[Recipes.schema]
  })

module.exports = mongoose.model('User', userSchema)

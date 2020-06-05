const mongoose = require('mongoose');
const Recepie = require('./food.js')

const userSchema = new mongoose.Schema(
  {
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    recepies:[Recepie.schema]
  })

module.exports = mongoose.model('User', userSchema)

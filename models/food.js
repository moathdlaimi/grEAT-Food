const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name:{type:String, required:true},
    img:String,
    ingredients:{type:String, required:true},
    cuisine:{type:String, required:true},
    instructions:{type:String, required:true},
    notes:String,
    diet:{type:String, required:true}
  }
);

module.exports = mongoose.model('food',foodSchema);

const {Schema, model}= require('mongoose');

const imgSchema = new Schema({
   filename:{
     type:String
   }
},{
  timestamps:true
})

module.exports= model('IMG', imgSchema)
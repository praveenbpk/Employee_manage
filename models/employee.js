const mongoose= require('mongoose');
const employeeSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required:true,
      min:6,
      max:255,
      unique:true
    },
    lastName:{
        type:String,
        required:true,
        min:6,
        max:255,
        unique:true
      },
    email:{
        type:String,
        required:true,
        max:255,
        min:6,
        unique:true,
    },
    location:{
        type:String,
        required:true,
        max:255,
        min:6,
        unique:true,
    },
    adharId:{
        type:Number,
        required:true,
        unique:true,
    },
    experience:{
        type:String,
        required:true,
        max:255,
        min:6,
        unique:true,
    }
   
  
},{ timestamps:true}
)

module.exports =mongoose.model("employee",employeeSchema);
  
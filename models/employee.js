const mongoose= require('mongoose');
const employeeSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required:true,
      min:6,
      max:255
    },
    lastName:{
        type:String,
        required:true,
        min:5,
        max:255
      },
    email:{
        type:String,
        required:true,
        max:255
        
    },
    location:{
        type:String,
        required:true,
        max:255,
        min:5
    },
    adharId:{
        type:Number,
        required:true,
        unique:true,
    },
    experience:{
        type:String,
        required:true,
    }
   
  
},{ timestamps:true}
)

module.exports =mongoose.model("employee",employeeSchema);
  
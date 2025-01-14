const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const driverSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"minimum 3 characters required"],
        },
        lastname:{
            type:String,
            minlength:[3,"minimum 3 characters required"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lovercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"minimum 6 characters required"],
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
        },
        plate:{
            type:String,
            required:true,
        },
        capacity:{
            type:Number,
            min:[1,"minimum capacity is 1"],
            required:true,
        },
        vehicleType:{
            type:String,
            enum:["car","auto","bike"],
            required:true,
        },
    },

    location:{
        lat:{
            type:Number,
            // required:true,
        },
        lng:{
            type:Number,
            // required:true,
        },
    }


},[
    {
        timestamps:true,
    }
]
)


driverSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;
}

driverSchema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

driverSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch;
}

module.exports = mongoose.model("driver",driverSchema);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({
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
},
{
    timestamps:true,
}
)


userShema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;
}

userShema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

userShema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch;
}

module.exports = mongoose.model('user', userShema);
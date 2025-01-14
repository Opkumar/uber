
const driverModel = require("../models/driver.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authDriver = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlacklistToken = await blacklistTokenModel.findOne({token:token});
    if (isBlacklistToken){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const userId =jwt.verify(token,process.env.JWT_SECRET);
        const driver = await driverModel.findById(userId._id);
        req.driver = driver;
        next();
        
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
        
    }
}
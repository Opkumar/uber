const BlacklistToken = require("../models/blacklistToken.model");
const driverModel = require("../models/driver.model");
const driverService = require("../services/driver.service");
const { validationResult } = require("express-validator");

module.exports.registerDriver = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(401).withMessage("Validation Error");
  }

  const { fullname, email, password, vehicle } = req.body;

  const driverExist = await driverModel.findOne({email});
  if(driverExist){
    return res.status(400).json({message:"Driver already exist  "});
  }

  const hashPassword = await driverModel.hashPassword(password);

  const driver = await driverService.createDriver({
    fullname,
    email,
    password: hashPassword,
    vehicle,
  });

  const token = await driver.generateAuthToken();
  res.status(201).json({ driver, token });
};


module.exports.loginDriver = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;

  const driver = await driverModel.findOne({ email }).select("+password");

  if (!driver) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await driver.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = await driver.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ driver, token });
};

module.exports.getProfile = async(req,res,next)=>{
    res.status(200).json(req.driver);
}

module.exports.logoutDriver = async(req,res,next)=>{
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({token});
  res.status(200).json({message:"Logout successfully"});
}

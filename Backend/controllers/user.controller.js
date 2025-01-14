const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult, cookie } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { fullname, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({ fullname, email, password: hashPassword });

    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });


};

module.exports.loginUser = async (req, res, next) => {
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    
    res.cookie("token",token);

    res.status(200).json({ user, token });

}


module.exports.getUserProfile = async (req , res ,next) => {
    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req , res ,next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:"Logout successfully"});

}
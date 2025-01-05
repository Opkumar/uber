const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");

router.post("/signup",[
    body("fullname.firstname").isLength({min:3}).withMessage("minimum 3 characters required"),
    body("email",).isEmail().withMessage("email is required"),
    body("password",).isLength({min:6}).withMessage("minimum 6 characters required"),
],userController.registerUser);

module.exports = router;

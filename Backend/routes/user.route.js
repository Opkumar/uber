const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup",[
    body("fullname.firstname").isLength({min:3}).withMessage("minimum 3 characters required"),
    body("email",).isEmail().withMessage("email is required"),
    body("password",).isLength({min:6}).withMessage("minimum 6 characters required"),
],userController.registerUser);


router.post("/login",[
    body("email",).isEmail().withMessage("email is required"),
    body("password",).isLength({min:6}).withMessage("minimum 6 characters required"),
],userController.loginUser);


router.get("/profile",authMiddleware.authUser,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser);

module.exports = router;

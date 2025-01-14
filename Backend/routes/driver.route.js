const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const driverMiddleware = require("../middlewares/authDriver.middleware");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("minimum 3 characters required"),
    body("email").isEmail().withMessage("email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("minimum 6 characters required"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("minimum 3 characters required"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("minimum 3 characters required"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "bike"])
      .withMessage("vehicle type must be car, auto or bike"),
  ],
  driverController.registerDriver
);


router.post(
  "/login",
  [
    body("email").isEmail().withMessage("email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("minimum 6 characters required"),
  ],
  driverController.loginDriver
);

router.get("/profile",driverMiddleware.authDriver, driverController.getProfile);
router.get("/logout",driverMiddleware.authDriver, driverController.logoutDriver);

module.exports = router;

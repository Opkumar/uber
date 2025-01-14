const driverModel = require("../models/driver.model");

module.exports.createDriver = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  if (!fullname.firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) { 
    throw new Error("All fields are required");
  }

  const driver = driverModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  
  return driver;
};

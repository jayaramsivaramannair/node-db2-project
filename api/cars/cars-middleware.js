const cars = require("../cars/cars-model.js")
let vinValidator = require('vin-validator');


const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  cars.getById(req.params.id)
    .then((car) => {
      if (car) {
        req.car = car
        next()
      } else {
        res.status(404).json({
          message: `car with id ${req.params.id} is not found`,
        })
      }
    })
    .catch((error) => {
      next(error)
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    return res.status(400).json({
      message: `vin field is missing`,
    })
  } else if (!req.body.make) {
    return res.status(400).json({
      message: `make field is missing`,
    })
  } else if (!req.body.model) {
    return res.status(400).json({
      message: `model field is missing`,
    })
  } else if (!req.body.mileage) {
    return res.status(400).json({
      message: `mileage field is missing`,
    })
  }

  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validateVin = vinValidator.validate(req.body.vin)

  if (validateVin) {
    next()
  } else {
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`,
    })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  cars.getAll()
    .then((cars) => {
      if (cars.length > 0) {
        const foundCarVin = cars.find((car) => car.vin.toLowerCase() === req.body.vin.toLowerCase())
        if (foundCarVin) {
          return res.status(400).json({
            message: `vin ${req.body.vin} already exists`,
          })
        } else {
          next()
        }
      } else {
        next()
      }
    })
    .catch((error) => {
      next(error)
    })
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
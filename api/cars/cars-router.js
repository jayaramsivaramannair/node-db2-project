// DO YOUR MAGIC
const router = require('express').Router()

const cars = require("./cars-model.js");
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware.js")

router.get('/', async (req, res, next) => {
    try {
        const allCars = await cars.getAll()
        res.status(200).json(allCars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const payload = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            title: req.body.title || "Not Known",
            transmission: req.body.transmission || "Not Known",
        }

        const newCar = await cars.create(payload)
        res.status(201).json(newCar)

    } catch (err) {
        next(err)
    }
})

router.put('/:id', checkCarId, checkCarPayload, checkVinNumberValid, async (req, res, next) => {
    try {
        const payload = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            title: req.body.title || "Not Known",
            transmission: req.body.transmission || "Not Known",
        }

        await cars.update(req.params.id, payload)
        const updatedCar = await cars.getById(req.params.id)

        res.status(200).json(updatedCar)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', checkCarId, async (req, res, next) => {
    try {
        const deletedCarRecord = await cars.getById(req.params.id)
        await cars.remove(req.params.id)
        res.status(200).json({
            message: "Car Successfully Deleted",
            deletedCar: deletedCarRecord,
        })
    } catch (err) {
        next(err)
    }
})


router.use((err, req, res, next) => {

    console.log(err)

    res.status(500).json({
        message: "Something went wrong with the request",
    })
})

module.exports = router;

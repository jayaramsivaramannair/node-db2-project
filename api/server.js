// DO YOUR MAGIC
const express = require("express")

const server = express();
const carsRouter = require("./cars/cars-router.js");

server.use(express.json());

server.use("/api/cars", carsRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome to my Cars API`,
    })
})



module.exports = server

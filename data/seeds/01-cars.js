
exports.seed = async function (knex) {
    await knex('cars').truncate()

    await knex('cars').insert([
        { id: 2, vin: "1ZVBP8CUXD5199808", make: "Tesla", model: "Model-S", mileage: 1500, title: "clean", transmission: "automatic fucking machine" },
        { id: 3, vin: "2T2BK1BA3EC249450", make: "Tesla", model: "Roadster", mileage: 15000, title: "clean", transmission: "automatic gorgeous machine" },
        { id: 4, vin: "WP0CA29973S651142", make: "Tesla", model: "Model-X aka Falcon Wings", mileage: 15050, title: "Not Known", transmission: "Not Known" }
    ])
};

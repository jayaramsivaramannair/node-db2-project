const db = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars')
    .where({ id })
    .first();
}

const create = (car) => {
  // DO YOUR MAGIC
  return db('cars')
    .insert(car)
    .then(ids => {
      return getById(ids[0]);
    });
}


const update = (id, changes) => {
  return db('cars')
    .where({ id })
    .update(changes);
}


const remove = (id) => {
  return db('cars')
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};



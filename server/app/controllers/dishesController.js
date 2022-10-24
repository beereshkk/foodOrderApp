const Dishes = require("../models/dishes");
const dishesController = {};

dishesController.create = (req, res) => {
  const body = req.body;
  const dishes = new Dishes(body);
  dishes
    .save()
    .then((dishes) => {
      res.json(dishes);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

dishesController.list = (req, res) => {
  Dishes.find()
    .then((dishes) => {
      res.json(dishes);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

dishesController.destroy = (req, res) => {
  const id = req.params.id;
  Dishes.findByIdAndDelete(id)
    .then((dish) => {
      res.json(dish);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
dishesController.show = (req, res) => {
  const id = req.params.id;
  Dishes.findById(id)
    .then((dish) => {
      res.json(dish);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = dishesController;

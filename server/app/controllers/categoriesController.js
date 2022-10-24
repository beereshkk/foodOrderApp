const Category = require("../models/categories");

const categoryController = {};

categoryController.create = (req, res) => {
  const body = req.body;
  const category = new Category(body);
  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

categoryController.list = (req, res) => {
  const id = req.params.id;

  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoryController.destroy = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = categoryController;

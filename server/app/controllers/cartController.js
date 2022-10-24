const Cart = require("../models/cartModel");

const cartController = {};

cartController.create = (req, res) => {
  const body = req.body;
  const user = req.user;
  const cart = new Cart({
    name: body.name,
    categoryID: body.categoryID,
    price: body.price,
    imageUrl: body.imageUrl,
    userId: user._id,
  });
  cart
    .save()
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

cartController.list = (req, res) => {
  const user = req.user;

  Cart.find({ userId: user._id })
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.json(err);
    });
};

cartController.destroy = (req, res) => {
  const id = req.params.id;
  const user = req.params.user;
  Cart.findByIdAndDelete(id)
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = cartController;

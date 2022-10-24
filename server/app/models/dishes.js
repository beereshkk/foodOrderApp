const mongoose = require("mongoose");
const Category = require("./categories");
const Schema = mongoose.Schema;

const dishesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = Dishes;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

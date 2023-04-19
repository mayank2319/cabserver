const mongoose = require("mongoose");
const { Schema } = mongoose;

const booking = new Schema({
  email: { type: String },
  destination: { type: String },
  source: { type: String},
  cab: { type: String},
  date: { type: Date, default: Date.now },
  time: { type: String},
  price: { type:String}
});
module.exports = mongoose.model("book", booking);
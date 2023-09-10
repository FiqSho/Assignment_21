const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  date: Date,
  department: String,
});

module.exports = mongoose.model('Sales', salesSchema);

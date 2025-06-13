const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
    species: String,
    gender: String,
    age: Number
});
module.exports = mongoose.model('Animal', AnimalSchema);
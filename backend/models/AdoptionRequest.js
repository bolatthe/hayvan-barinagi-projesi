const mongoose = require('mongoose');
const AdoptionRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
    status: { type: String, default: 'pending' }
});
module.exports = mongoose.model('AdoptionRequest', AdoptionRequestSchema);
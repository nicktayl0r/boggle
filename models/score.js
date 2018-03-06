const mongoose = require('mongoose');

//This model is for persisting playerScores in the db.
let scoreSchema = new mongoose.Schema({
    userId: String,
    score: Number
},{
    timestamps: true
})

module.exports = mongoose.model('Score', scoreSchema);
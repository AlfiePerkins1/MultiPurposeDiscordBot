const mongoose = require("mongoose");


const banSchema = mongoose.Schema({

_id: mongoose.Schema.Types.ObjectId,
bUsername: String,
bID: String,
legnth: String,
time: String
});

module.exports = mongoose.model("Ban", banSchema);
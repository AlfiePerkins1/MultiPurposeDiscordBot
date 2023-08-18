const mongoose = require("mongoose");


const muteSchema = mongoose.Schema({

_id: mongoose.Schema.Types.ObjectId,
mUsername: String,
rID: String,
legnth: String,
time: String
});

module.exports = mongoose.model("Mute", muteSchema);
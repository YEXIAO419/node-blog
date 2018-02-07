var mongoose = require("mongoose");

var articleTypeSchema = new mongoose.Schema({
    typename: String
})

var ArcType = mongoose.model("ArcType", articleTypeSchema);

module.exports = ArcType;
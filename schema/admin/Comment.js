var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    author:String,
    article:String,
    createtime:Date,
    content:String
});

var Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;
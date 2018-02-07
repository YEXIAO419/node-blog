var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title: String,
    attribute: [],
    author: String,
    username: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: "ArcType"
    },
    createtime: Date,
    read: Number,
    content: String,
    support:Number,
    Tag: [],
    updatetime: Date
})

var Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
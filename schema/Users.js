var mongoose = require("mongoose");

/*
* 数据不指定必须存在则可以为空
 */
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rank: Number,
    regtime: Date,
    updatetime: Date
})

var User = mongoose.model("user", userSchema);

module.exports = User;
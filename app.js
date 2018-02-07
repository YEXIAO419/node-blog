var express = require("express");
var app = express();

var db = require("./config/db.js");
var session = require("express-session");
var bodyParser = require("body-parser");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60*30*1000 }
}))

app.set("view engine", "ejs"); //ejs、jade、swing(html)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("./public")); //静态资源


//前端端模块
app.use(require("./router/frontend/index.js"));

/*
    前端展示
    后端管理
    首页：
    404
 */

//后端模块
app.use("/admin", require("./router/admin/index.js"));

//引入用户注册和登录模块
app.use(require("./router/users/users.js"));

app.listen(3001);
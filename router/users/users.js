var express = require("express");
var app = express();
var router = express.Router();
var util = require("util");
var userModel = require("../../modles/users/users.js");//业务模块

router.get("/register", function(req, res, next){
    res.render("users/register");
});

router.post("/register", function(req, res, next){
   //插入第一次没问题，需要判断用户是否已经存在
    userModel.userFind(req, function(err, result, fields){
        if(err){
            return;
        }
        if(result.length > 0){
            console.log("用户名已存在")
        }else{
            userModel.register(fields, function(err){
                if(err){
                    return;
                }
                res.redirect("/login");
            });
        }
    })
});

/*
********************登录
* */
router.get("/login", function(req, res, next){
    res.render("users/login");
});

router.post("/login", function(req, res, next){
   userModel.queryUserInfo(req, function(result){
       console.log(result);
       if(result == 0){
           res.send("用户名和密码必须填写哦");
       }else if(result == 1){
           res.send("用户没有注册");
       }else if(result == 2){
           res.redirect("/admin");
       }else if(result == 3){
           res.send("用户名或密码错误");
       }
   })
});

module.exports = router;
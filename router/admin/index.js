/*
* 后台管理路由主页
* */
var express = require("express");
var router = express.Router();
var util = require("util");
var formidable = require("formidable");
var ArcticleType = require("../../schema/admin/ArticleType.js")
var Article = require("../../schema/admin/Article.js")
var articleRouter = require("./article.js")
var articleTypeRouter = require("./articleType.js")
var usersRouter = require("./../users/users.js")
var userModel = require("../../modles/users/users.js");

router.use("/", function(req, res, next){
        if(!req.session.userInfos){
            res.redirect("/login");
        }
        userModel.isAdmin(req.session.userInfos.name, function(err, result){
            if(err){
                console.log(err);
                return;
            }
            //结果只有两个，1是管理员，2是会员
            if(result){
                next();
            }else{
                res.redirect("/");
            }
        })
})

router.get("/", function(req, res, next){
        res.redirect("admin/articleList");
})

// 引入文章模块
router.use(articleRouter);

// 引入分类模块
router.use(articleTypeRouter);;

module.exports = router;
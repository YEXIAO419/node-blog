/*
* 文章模块
**/
var express = require("express");
var router = express.Router();
var util = require("util");
var formidable = require("formidable");
var ArcticleType = require("../../schema/admin/ArticleType.js");
var Article = require("../../schema/admin/Article.js"); //实体操作对象
var articleModel = require("../../modles/admin/article.js");//业务模块
var artTypeModel = require("../../modles/admin/articleType.js");//业务模块

router.get("/articleList", function(req, res, next){
    //指挥articleModel去查数据
    var params = req.query;
    params.username = req.session.userInfos.name;
    articleModel.findArticle(params, function(err, result){
        res.render("admin/articleList", {art: result, userInfos: req.session.userInfos});
    })
});

router.get("/addArticle", function(req, res, next){
    artTypeModel.findType({}, function(err, reslut){
        res.render("admin/addArticle", {type:　reslut, userInfos: req.session.userInfos});
    })
});

router.post("/addArticle", function(req, res, next){
    //传入“req”对象也就是传入了提交的参数
    articleModel.addForm(req, function(err){
        if(err == "-1"){
           res.send("资料还没填完呢？")
            return;
        }else if(err){
            console.log(err);
            return;
        }else {
            res.redirect("/admin/articleList")
        }
    })
});

router.get("/editArticle", function(req, res, next){
    articleModel.updateArticle(req.query, function(err, result){
        if(err){
            console.log(err);
            return;
        }
        res.render("admin/updateArticle", {result: result, userInfos: req.session.userInfos});
    });
});

router.post("/editArticle", function(req, res, next){
    //传入“req”对象也就是传入了提交的参数
    articleModel.editForm(req, function(err){
        if(err == "-1"){
            res.send("资料还没填完呢？")
            return;
        }else if(err){
            console.log(err);
            return;
        }else {
            res.redirect("/admin/articleList")
        }
    })
});

router.get("/deleteArticle", function(req, res, next){
    articleModel.deleteArticle(req.query, function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect("/admin/articleList")
    });
});

module.exports = router;
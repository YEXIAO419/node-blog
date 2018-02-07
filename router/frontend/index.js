/*
    负责文章模块

*/
var express = require("express");

var router = express.Router();

var artModel = require("../../modles/frontend/artModel.js");//文章业务模块

//文章列表
router.get("/", function (req, res, next) {
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间

    */
    var currUser = req.session.userInfos ? req.session.userInfos.name : "";
    artModel.findList(req.query, function (err, result) {
        artModel.findList(req.query, function(err, hotArt){
            res.render("frontend/index", { art: result, hotArt: hotArt, username: currUser });
        }, 5, {read: 1})
    }, 3, {createtime: -1});

});

router.get("/detail", function(req, res, next){
    var aid = req.query._id;
    artModel.artDetail({ _id: aid }, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var currUser = req.session.userInfos ? req.session.userInfos.name : "未登陆";
        res.render("frontend/article", { art: result, username: currUser});
    });
});

router.post("/addComment", function(req, res){
    artModel.addComment(req, function(){
        artModel.findComment({article: req.body.contentid}, {page:　1, pageamount: 10, sort: {createtime: -1}}, function(err, result){
            if(err){
                console.log(err);
                return;
            }
            res.json(result);
        })
    })
});

router.get("/commentList", function(req, res, next) {
    var id = req.query.contentid;
    var page = req.query.page;
    artModel.findComment({article: id}, {page:　page, pageamount: 10, sort: {createtime: -1}}, function(err, result){
        if(err){
            console.log(err);
            return;
        }
        if(result.commentlist.length > 0){
            res.json({
                message: "返回成功",
                success: true,
                result: result
            });
        }else {
            res.json({
                message: "返回失败",
                success: false,
                result: result
            });
        }
    })
});

//情感天地
router.get("/feelings", function (req, res, next) {
    artModel.findList(req.query, function (err, result) {
        res.render("frontend/feelings", { art: result});
    }, 10, {createtime: -1});

});

//工作学习
router.get("/work", function (req, res, next) {
    artModel.findList(req.query, function (err, result) {
        res.render("frontend/work", { art: result});
    }, 10, {createtime: -1});

});

//生活杂谈
router.get("/other", function (req, res, next) {
    artModel.findList(req.query, function (err, result) {
        res.render("frontend/other", { art: result});
    }, 10, {createtime: -1});

});

//每日语录
router.get("/daily", function (req, res, next) {
    artModel.findList(req.query, function (err, result) {
        res.render("frontend/daily", { art: result});
    }, 10, {createtime: -1});

});

module.exports = router;
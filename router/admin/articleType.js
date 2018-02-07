/*
* 分类模块
**/

var express = require("express");
var router = express.Router();
var util = require("util");
var formidable = require("formidable");
var ArcticleType = require("../../schema/admin/ArticleType.js")
var artTypeModel = require("../../modles/admin/articleType.js");

router.get("/typeList", function(req, res, next){
    artTypeModel.findType({}, function(err, result) {
        if(err){
            console.log(err);
            return;
        }
        res.render("admin/arcTypeList", {arcType : result, userInfos: req.session.userInfos});
    })
})

router.get("/addType", function(req, res, next){
    res.render("admin/addType");
})

router.get("/addTypeForm", function(req, res, next){
    ArcticleType.create(req.query, function(){
        res.send("插入成功");
    })
})

module.exports = router;
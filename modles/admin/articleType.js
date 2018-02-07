var express = require("express");
var router = express.Router();
var util = require("util");
var formidable = require("formidable");
var ArcticleType = require("../../schema/admin/ArticleType.js")
var Article = require("../../schema/admin/Article.js")


module.exports = {
    findType: function(params, callback){
        ArcticleType.find(params || {}).populate("type").exec(function(err, result){
            callback(err, result);
        });
        },
    addArticle: function(){},
    addForm: function(req, callback){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content  != ""){
                Article.create(fields,function(){
                    res.send("插入成功");
                });
            }else{
                res.send("填写不及格，请继续填写");
            }
        })
        callback
    },
    updateArticle: function(){},
    deleteArticle: function(){}
    }

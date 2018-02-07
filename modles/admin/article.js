var express = require("express");
var router = express.Router();
var util = require("util");
var ArcticleType = require("../../schema/admin/ArticleType.js")
var Article = require("../../schema/admin/Article.js")
var artTypeModel = require("../../modles/admin/articleType.js");//业务模块

module.exports = {
    //params:查询条件，callback回调函数
    findArticle: function(params, callback){
        Article.find(params || {}).populate("type").exec(function(err, result){
            callback(err, result);
        });
        },
    addArticle: function(){},
    addForm: function(req, callback){
            req.body.createtime = req.body.updatetime = new Date
            if(req.body.title != "" && req.body.author != "" && req.body.type != "" && req.body.read != "" && req.body.tag != "" && req.body.content  != ""){
                Article.create(req.body,function(err){
                    callback(err);
                });
            }else{
                callback("-1");  //-1表示参数没有填完
            }
    },
    updateArticle: function(params, callback){
        this.findArticle(params, function(err, result){
            artTypeModel.findType({}, function(err, artType){
                callback(err, {art:result[0],artType:artType});
            })
        })
    },
    editForm: function(req, callback){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        fields.updatetime = new Date();
        if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content  != ""){
            Article.update(fields,function(err){
                callback(err);
            });
        }else{
            //-1表示参数没有填完
            callback("-1");
        }
    })
},
    deleteArticle: function(req, callback){
        Article.remove(req, function(err){
            callback(err);
        })
    }
}

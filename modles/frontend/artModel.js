var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");


var Article = require("../../schema/admin/Article.js");
var Comment = require("../../schema/admin/Comment.js");

module.exports = {
    findList: function (params, callback, n, sortParams) {
        Article.find(params || {}, function (err, result) {
            callback(err, result);
        }).limit(n || "").sort(sortParams || {});
    },
    artDetail: function (params, callback) {
        Article.findOne(params || {}, function (err, result) {
            callback(err, result);
        });
    },
    addComment: function (req, callback) {
        var obj = {};
        obj.createtime = new Date();
        obj.author = req.session.userInfos ? req.session.userInfos.name : "匿名";
        obj.article = req.body.contentid;
        obj.content = req.body.content;
        Comment.create(obj, function (err) {
            if (err) {
                return;
            }
            callback();
        })
    },
    findComment: function (params, condition, callback) {
        var page = condition.page || 1;
        var pageamount = condition.pageamount;
        var skipNum = (page - 1) * pageamount;
        var sort = condition.sort;
        Comment.find(params || {}, function (err, result) {
            Comment.count(params, function (err, totalamount) {
                if(result){
                    callback(err, {
                        commentlist: result,
                        page: page,
                        totalamount: totalamount,
                        pageamount: pageamount,
                        totolpage: Math.ceil(totalamount/pageamount)
                    });
                }else{
                    callback(err);
                }
            })
        }).limit(pageamount).skip(skipNum).sort(sort);
    }
}
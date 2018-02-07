var express = require("express");

var router = express.Router();

var formidable = require("formidable");

var crypto = require("crypto");
var Users = require("../../schema/Users.js");
/*
    登录注册的业务实现
*/



module.exports = {
    register:function(fields,callback){
        if(fields.username != "" && fields.password != ""){
            var md5 = crypto.createHash("md5");
            fields.password = md5.update(fields.password).digest("base64");
            fields.regtime = fields.updatetime = new Date();
            fields.rank = 1;//标记用户等级的，可以定义一个规则，比如用户1-10表示普通用户，11-20表示管理员
            Users.create(fields,function(err){
                callback(err);
            });

        }else{
            callback("-1");
        }

    },
    //用户是否存在：判断用户名是否已经存在
    userFind:function(req,callback){
            if(req.body.username != "" && req.body.password != ""){
                Users.find({username:req.body.username},function(err,result){
                    callback(err,result,req.body);
                });

            }else{
                callback("-1");
            }
    },

    /*
    * queryUserInfo
    * result： 0 用户名或者密码有空值  1 没有注册  2 成功登陆 3 用户名或密码错误
    * rank：记录权限登记  0-10普通用户，11-20管理员
    * */
    queryUserInfo:function(req,callback){
        if(req.body.username == "" || req.body.password == ""){
            callback(0);
            return;
        }

        Users.findOne({username:req.body.username},function(err,result){
            if(err){
                console.log(err);
                return;
            }

            var md5 = crypto.createHash("md5");
            req.body.password = md5.update(req.body.password).digest("base64");

            if(result ==  null){
                callback(1);
            }else if(result.username == req.body.username && result.password == req.body.password){
                req.session.userInfos = { name:result.username,sign:true, rank: result.rank};
                callback(2);
            }else{
                callback(3);
            }
        });

    },
    isAdmin:function(username,callback){
        Users.findOne({username:username},function(err,result){
                callback(err,true);
        });
    }

}
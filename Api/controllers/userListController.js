var mongoose = require('mongoose'),
    User = mongoose.model('User');
var fs = require('fs');


exports.login = function (req, res) {
    User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
        if(err) res.send({success: false, err: err});
        if(user === null) res.json({success: false, err: "Wrong Password or Username", help:JSON.stringify(req.params)});
        else res.json({success: true, data: user});
    });
};

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user){
        if(err){
            if(err.code == 11000){
                res.send({success: false, err:"Username already taken"});
            }
        }else res.send({success: true, data: user});
    });
};

exports.updateUser = function (req, res) {
    User.findOneAndUpdate({_id: req.params._id}, req.body, {upsert: true}, function(err,user){
        if(err){
            res.send({success: false, err:JSON.stringify(err)});
        }else res.send({success: true, data: user});
    })
};

exports.getUser = function (req, res){
    User.find({username: { $regex: req.params.username}}, function(err,user){
        if(err){
            res.send({success: false, err:JSON.stringify(err)});
        }else res.send({success: true, data: user});
    });
};
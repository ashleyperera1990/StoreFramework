var User = require('../models/user.model').User;
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var db = require('../configs/database');


exports.create = function (req, res) {

    var obj = req.body;
    var newEntry = new User(
        {
            username: obj.username,
            password: obj.password,
            details: {
                firstName: obj.firstName,
                surname: obj.surname,
                emailAddress: obj.emailAddress,
                address: {
                    line1: obj.address.addressLine1,
                    line2: obj.address.addressLine2,
                    city: obj.address.city,
                    postcode: obj.address.postcode
                }
            }
        });

    newEntry.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Username already exists'})
        }
        return res.json({success: true, user: newEntry});
    });

};

exports.authenticate = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if(!user) {
            res.send({success: false, msg: 'Username does not exist'})
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, db.secret);

                    res.json({success: true, token: 'JWT ' + token})
                } else {
                    res.send({success: false, msg: 'You have entered an invalid password'})
                }
            })
        }
    })
};

exports.getUserInfo = function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, db.secret);
        User.findOne({
            username: decoded.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, user: user});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


exports.delete = function (req, res) {
    var id = req.params.id;

    // var query = MySchemaModel.findOne({uid: id});
    // query.exec(function(err, data) {
    // 	if (err) {
    // 		return res.send(404, err);
    // 	}

    // 	if (data != null) {
    // 		data.remove();
    // 	}

    // 	return res.send(200);
    // });

    return res.send(200);
};


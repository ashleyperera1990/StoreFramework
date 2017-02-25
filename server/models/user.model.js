var mongoose = require('mongoose');
var Schema = mongoose.Schema;// Define Schemas
var bycrypt = require('bcrypt');

var User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    details: {
        firstName: {type: String, required: true},
        surname: {type: String, required: true},
        emailAddress: {type: String, required: true},
        address: {
            line1: {type: String, required: true},
            line2: {type: String, required: false},
            city: {type: String, required: true},
            postcode: {type: String, required: true}
        }
    }
});

User.methods.comparePassword = function (passw, cb) {
    bycrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

User.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bycrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bycrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


// Export Models
exports.User = mongoose.model('User', User);
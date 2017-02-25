var Order = require('../models/Order.model').Order;
var mongoose = require('mongoose');
var passport = require('passport');

require('../configs/passport')(passport);

exports.getAllByUserId = function (req, res) {
    var userId = req.params.id;

    var query = Order.find({userId: userId});
    query.exec(function (err, orders) {
        if (err) {
            return res.send(404, err);
        }
        return res.send(200, {orders: orders});
    });
};

exports.getById = function (req, res) {
    var orderId = req.params.id;
    var query = Order.findOne({
        _id: orderId
    });
    query.exec(function (err, order) {
        if (err) {
            return res.send(404, err);
        }
        return res.send(200, {order: order});
    });
};

exports.create = function (req, res) {

    var obj = req.body;
    var id = mongoose.Types.ObjectId();

    var newEntry = new Order(
        {
            uid: id,
            userId: obj.userId,
            fullName: obj.fullName,
            billingAddress: obj.billingAddress,
            deliveryAddress: obj.deliveryAddress,
            dateOrdered: obj.dateOrdered,
            items: obj.items,
            total: obj.total
        });

    newEntry.save(function (err) {
        if (err) {
            console.log(err);
        }
        return res.json(newEntry);
    });

};

exports.edit = function (req, res) {
    var data = req.body.data;

    // MySchemaModel.update({uid: data.uid},
    // 	{field: data.field},
    // 	function(err, nbRows, raw) {
    // 		if (err) {
    // 			return res.send(400);
    // 		}

    // 		return res.send(200);
    // 	}
    // );

    return res.send(200);
}

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
}
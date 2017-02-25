var Product = require('../models/product.model').Product;
var mongoose = require('mongoose');

exports.getAll = function (req, res) {
    var query = Product.find({});
    query.exec(function (err, data) {
        if (err) {
            return res.send(404, err);
        }
        return res.send(200, {data: data});
    });
};

exports.read = function (req, res) {
    var query = Product.findOne({uid: id});
    query.exec(function (err, data) {
        if (err) {
            return res.send(404, err);
        }
        return res.send(200, {data: data});
    });
};

exports.create = function (req, res) {

    var obj = req.body;
    var id = mongoose.Types.ObjectId();

    var newEntry = new Product(
        {
            uid: id,
            name: obj.name,
            price: obj.price,
            description: obj.description,
            inStock: true
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
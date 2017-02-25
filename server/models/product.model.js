var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schemas
var Product = new Schema({
	uid: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
    price: {type: Number, required: true},
	description: {type: String, required: false},
	inStock: {type: Boolean, required: true},
});



// Export Models
exports.Product = mongoose.model('Product', Product);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schemas
var Order = new Schema({
    uid: {type: Schema.Types.ObjectId, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    billingAddress: { type: Object, required: true},
    deliveryAddress: { type: Object, required: true},
    dateOrdered: {type: Date, required: true},
    items: {type: Array, required: true},
    total: {type: Number, required: true}
});


// Export Models
exports.Order = mongoose.model('Order', Order);
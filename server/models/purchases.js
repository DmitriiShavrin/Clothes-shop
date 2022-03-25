const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    user_id: String,
    date: String, 
    items: Array,
    total: Number
});

module.exports = model('purchases', schema);

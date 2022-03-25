const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    title: String,
    category_id: { type: String, default: 'Женское' },
    photo: String,
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    comment: { type: String, default: 'Нет' },
    quantity: { type: Number, default: 0 },
    new: {type: Boolean, dafault: false},
    count: { type: Number, default: 0 }
});

module.exports = model('items', schema);


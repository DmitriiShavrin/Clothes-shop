const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    title: String,
    adress: String,
    phone: String,
    email: String
});

module.exports = model('shops', schema);


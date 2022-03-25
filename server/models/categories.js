const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    c_title: String,
    c_photo: String,
    c_url: String
});

module.exports = model('categories', schema);
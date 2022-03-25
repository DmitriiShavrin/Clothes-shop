const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    title: String,
    photo: String,
    background: String,
    active: {type: Boolean, default: false}
});

module.exports = model('banners', schema);
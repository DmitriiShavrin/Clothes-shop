const { Schema, model, modelNames } = require('mongoose');

const schema = new Schema({
    name: String,
    last_name: String,
    paternal: String,
    email: String,
    pass: String,
    reg_date: String,
    login_date: { type: String, default: '' },
    role: { type: String, default: 'USER' },
    token: { type: String, default: '' },
    favorite: Array,
    block: false,
    chat: Array,
    purchased: Array,
    spent_money: String,
    gender: String,
    subscribtion: false,
    messages: false,
    validation: false,
    birth: String,
    cards: Array,
    social_media: Array
});

module.exports = model('users', schema);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const usersRoute = require('./routes/usersRoute');
const itemsRoute = require('./routes/itemsRoute');
const filterRoute = require('./routes/filterRoute');
const categoryRoute = require('./routes/categoryRoute.js');
const bannerRoute = require('./routes/bannerRoute');
const shopsRoute = require('./routes/shopsRoute');
const chatRoute = require('./routes/chatRoute');
const cartRoute = require('./routes/cartRoute');


const App = express();

App.use(cors());
App.use(express.json());
App.use(fileUpload());
App.use('/img', express.static('img'))
App.use('/img_banner', express.static('img_banner'))

App.use('/users', usersRoute);
App.use('/items', itemsRoute);
App.use('/filter', filterRoute);
App.use('/category', categoryRoute);
App.use('/banners', bannerRoute);
App.use('/shops', shopsRoute);
App.use('/chat', chatRoute);
App.use('/cart', cartRoute);



mongoose.connect('mongodb://localhost/clothes', () => {
    console.log('DB connected')
});

App.get('/', (req, res) => {
    res.send('ok')
});


App.listen(5000, 'localhost', () => {
    console.log('Server running ....')
});
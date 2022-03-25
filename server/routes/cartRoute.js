const { Router } = require('express');

const router = Router();
const Users = require('../models/users');
const Items = require('../models/items');
const Purchases = require('../models/purchases');

//make an order for no name

router.post('/make_order/:user_id', async(req, res) => {
    const Cart = JSON.parse(req.body.items);

    for(let item of Cart)
    {
        let count = item.quantity - item.count;
        await Items.updateOne({ _id: item._id }, { quantity: count });
    }

    await Purchases.create({ user_id: req.params.user_id, date: new Date().toLocaleString(), items: Cart, total: req.body.total });
    
    res.send({status: 'ok'})
});

//get all purchases 

router.get('/', async(req, res) => {
    res.send({status: 'ok', body: await Purchases.find()})
});

//get Customer purchases 

router.get('/customer_puchases', async(req, res) => {
    const purchases = await Purchases.find(req.body.id)
    res.send({status: 'ok', body: purchases})
});


module.exports = router;
const { Router } = require('express');

const router = Router();
const Shops = require('../models/shops');


//Getting all categories

router.get('/', async(req, res) => {
    const allShops = await Shops.find();
    res.send(allShops)
})

//Creating of shops

router.post('/', async(req, res) => {

    const Check = await Shops.findOne({ title: req.body.title })

    if (!Check) {

        if (await Shops.create(req.body)) {
            const result = await Shops.find();
            res.send({ status: 'ok', body: result });
        } else
            res.send({ status: 'error' });

    } else {
        res.send({ status: 'already' });
    }
});

//Deleting of shop

router.delete('/:_id', async(req, res) => {
    await Shops.deleteOne(req.params);
    res.send(await Shops.find());
});

//Editing of shops

router.put('/:_id', async(req, res) => {
    await Shops.updateOne(req.params, {...req.body });
    res.send({status: 'ok', body: await Shops.find()})
});

module.exports = router;
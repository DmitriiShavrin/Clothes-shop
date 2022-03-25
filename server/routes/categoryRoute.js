const { Router } = require('express');
const Category = require('../models/categories');

const router = Router();

//Getting all categories

router.get('/', async(req, res) => {
    const allCategories = await Category.find();
    res.send(allCategories)
})

//Creating of categoryes

router.post('/', async(req, res) => {

    const Check = await Category.findOne({ c_title: req.body.c_title })

    if (!Check) {

        if (await Category.create(req.body)) {
            const result = await Category.find();
            res.send({ status: 'ok', body: result });
        } else
            res.send({ status: 'error' });

    } else {
        res.send({ status: 'already' });
    }
});

//Deleting of categories

router.delete('/:_id', async(req, res) => {
    await Category.deleteOne(req.params);
    res.send(await Category.find());
});

//Editing of categories

router.put('/:_id', async(req, res) => {
    await Category.updateOne(req.params, {...req.body });
    res.send(await Category.find());
});

module.exports = router;

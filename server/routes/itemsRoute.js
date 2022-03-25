const { Router } = require('express');
const Items = require('../models/items');
const Category = require('../models/categories');
const path = require('path');

const router = Router();

//Getting all

router.get('/', async(req, res) => {
    const allItems = await Items.find();
    res.send(allItems)
})

//Adendum of items

router.post('/', async(req, res) => {

    console.log(req.body);
    console.log(req.files);

    const Check = await Items.findOne({ title: req.body.title });

    if (!Check) {
        let filename = '';
        if (req.files.photo) {
            filename = Date.now() + path.extname(req.files.photo.name);
            req.files.photo.mv('img/' + filename)
        }
        if (await Items.create({...req.body, photo: filename })) {
            res.send({ status: 'ok' })
        } else {
            res.send({ status: 'error' })
        }
    } else {
        res.send({ status: 'already' })
    }
});

//Delete items

router.delete('/:_id', async(req, res) => {
    await Items.deleteOne(req.params);
    res.send(await Items.find());
});

//Update of item

router.put('/:_id', async(req, res) => {
    let filename = '';
    if (req.files?.photo) {
        filename = Date.now() + path.extname(req.files.photo.name);
        req.files.photo.mv('img/' + filename);
    }

    await Items.updateOne(req.params, {...req.body, photo: filename ? filename : req.body.photo });
    res.send(await Items.find());
})

// фильтрация по категории
router.get('/get_data/:c_url', async(req, res) => {
    const Cat = await Category.findOne(req.params);

    const Comms = await Items.find({category_id: Cat._id});
    res.send({ status: 'ok', body: { data: Comms, category_title: Cat.c_title }})
});


// new

router.put('/new/:_id', async(req, res) => {
    await Items.updateOne(req.params, {...req.body, new: true})
    res.send({status: 'ok', body: await Items.find()})
});

// not-new 

router.put('/non_new/:_id', async(req, res) => {
    await Items.updateOne(req.params, {...req.body, new: false})
    res.send({status: 'ok', body: await Items.find()})
}); 

// only new items

router.get('/only_new', async(req, res) => {
    res.send({status: 'ok', body: await Items.find({new: true}) })
})


module.exports = router;
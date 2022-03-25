const {Router} = require('express');
const Banners = require('../models/banners');
const path = require('path');

const router = Router();

//Getting all

router.get('/', async(req, res) => {
    const allBanners = await Banners.find();
    res.send(allBanners);
})

// Creation of banner

router.post('/', async(req, res) => {
    const Check = await Banners.findOne({title: req.body.title});

    if(!Check) {
        let filename = '';
        if(req.files?.photo) {
            filename = Date.now() + path.extname(req.files.photo.name);
            req.files.photo.mv('img_banner/' + filename)
        }
        if(await Banners.create({...req.body, photo: filename})) {
            res.send({status: 'ok', body: await Banners.find()})
        } else {
            res.send({status: 'error'})
        }
    } else {
        res.send({status: 'already exists'})
    }
});

// Delete banners

router.delete('/:_id', async(req, res) => {
    await Banners.deleteOne(req.params);
    res.send(await Banners.find())
});

// Update banners

router.put('/:_id', async(req, res) => {
    let filename = '';
    if (req.files?.photo) {
        filename = Date.now() + path.extname(req.files.photo.name);
        req.files.photo.mv('img_banner' + filename);
    }

    await Banners.updateOne(req.params, {...req.body, photo: filename ? filename : req.body.photo});
    res.send({status: 'ok', body: await Banners.find()})
})

// Activate

router.put('/activate/:_id', async(req, res) => {
    await Banners.updateMany({active: false})
    await Banners.updateOne(req.params, {active: true})
    res.send({status: 'ok', body: await Banners.find()})
})

// get current banner

router.get('/current', async(req, res) => {
    res.send({status: 'ok', body: await Banners.findOne({active: true})})
})

module.exports = router;
const { Router } = require('express');

const router = Router();
const Users = require('../models/users');
const Items = require('../models/items');
const Purchases = require('../models/purchases');

// REGISTRATION

router.post('/register', async(req, res) => {

    const Check = await Users.findOne({ email: req.body.email })

    if (!Check) {
        if (await Users.create(req.body))
            res.send({ status: 'ok' });
        else
            res.send({ status: 'err' });
    } else {
        res.send({ status: 'already' });
    }
});

// LOGIN

router.post('/login', async(req, res) => {
    const Check = await Users.findOne({ email: req.body.email, pass: req.body.pass })

    if (Check != null) {
        const hash = Date.now();
        await Users.updateOne({ email: Check.email }, { login_date: new Date().toLocaleString(), token: hash });
        res.send({ status: 'ok', ...Check._doc, token: hash });
    } else if (Check.block == true) {
        res.send({ status: 'blocked' })
    } else {
        res.send({ status: 'err' })
    }
});

router.post('/check', async(req, res) => {
    const Check = await Users.findOne({ token: req.body.token })
    if (Check != null) {
        res.send({ status: 'ok', ...Check._doc })
    } else {
        res.send({ status: 'fail' })
    }
})

//Get all users

router.get('/all', async(req, res) => {
    const allUsers = await Users.find();
    res.send(allUsers)
})

//delete

router.delete('/:_id', async(req, res) => {
    if(req.params.role != 'ADMIN')
        await Users.deleteOne(req.params);
    res.send(await Users.find());
});

// block user

router.put('/block/:_id', async(req, res) => {
    await Users.updateOne(req.params, {...req.body, block: true});
    res.send(await Users.find())
})

// upblock user

router.put('/unblock/:_id', async(req, res) => {
    await Users.updateOne(req.params, {...req.body, block: false});
    res.send(await Users.find())
})

//add to favorites CUSTOMER ME

router.put('/add_favorites/:_id', async(req, res) => {

    await Users.updateOne(req.params, { favorite: [ ...JSON.parse(req.body.favorite) ] });
    res.send({status: 'ok'})
})

//get favorites 

router.put('/get_favorites', async(req, res) => {
    const favorites = await Items.find( { _id: { $in: JSON.parse(req.body.favorite) } })

    res.send({status: 'ok', body: favorites})
})

//update Login

router.put('/update_login/:_id', async(req, res) => {
    const Check = await Users.findOne({ email: req.body.email })

    if(!Check){
        if(await Users.updateOne(req.params, {email: req.body.email})){
            res.send({status: 'ok'})
        } else {
            res.send({status: 'err'});
        }
    }else{
        res.send({ status: 'already' });
    }
});

//update PASSWORD

router.put('/update_pass/:_id', async(req, res) => {
    await Users.updateOne(req.params, {pass: req.body.pass})
    res.send({status: 'ok'})
       
});

//add new card credit

router.put('/add_cards/:_id', async(req, res) => {
    await Users.updateOne(req.params, {cards: req.body.cards.split(',')})
    res.send({status: 'ok'})
})

//delete card credit

router.put('/delete_cards', async(req, res) => {
    await Users.updateOne(req.params, {cards: req.body.cards.split(',')})
    res.send({status: 'ok'})
})

//add social network DO NOT WORK

router.put('/add_social_network/:_id', async(req, res) => {
    await Users.updateOne(req.params, {social_media: [ ...JSON.parse(req.body.social_media) ]});
    res.send({status: 'ok'})
})

// delete social network

router.put('/delete_social_network', async(req, res) => {
    await Users.updateOne(req.params, {social_media: [ ...JSON.parse(req.body.social_media) ]});
    res.send({status: 'ok'})
})

// update user's name

router.put('/update_name/:_id', async(req, res) => {
    await Users.updateOne(req.params, {name: req.body.name})
    res.send({status: 'ok'})
})

// update user's LAST name

router.put('/update_last_name/:_id', async(req, res) => {
    await Users.updateOne(req.params, {last_name: req.body.last_name})
    res.send({status: 'ok'})
})
// update user's PATERNAL

router.put('/update_paternal/:_id', async(req, res) => {
    await Users.updateOne(req.params, {paternal: req.body.paternal})
    res.send({status: 'ok'})
})





module.exports = router;
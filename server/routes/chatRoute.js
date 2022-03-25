const { Router } = require('express');

const router = Router();
const Users = require('../models/users');

router.put('/add_chat/:_id', async (req, res) => { 
    await Users.updateOne(req.params, { chat: JSON.parse(req.body.chat) }); 
    res.send({status: 'ok', body: await Users.find()})
})

router.get('/chat/:_id', async (req, res) => { 
    const Res = await Users.findOne(req.params)
    res.send({status: 'ok', body: Res.chat})
})



module.exports = router;
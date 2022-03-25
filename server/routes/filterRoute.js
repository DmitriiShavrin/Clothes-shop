const { Router } = require('express');
const Items = require('../models/items');
const router = Router();

router.post('/search', async (req, res) => {

    let  { title } = req.body;

    title = title.split('').map((el, inx) => inx == 0 ? el.toUpperCase() : el ).join('');

    console.log(title);

    res.send({status: 'ok', body:  await Items.find(req.body.title.trim() ? { title: {$regex: `^${title}.*`} }  : {})})
});

module.exports = router;
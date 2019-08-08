const express = require('express');
const router = express.Router();
const bookCat = require('../models/bookCat');

router.post('/bookcat', (req,res) => {
    const bookcat = new bookCat({
        book_cat: req.body.book_cat
    });

    bookcat.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Book Category Added successfully')
    })
})

router.get('/getbookcat',(req,res) =>{

    bookCat.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});


module.exports = router;
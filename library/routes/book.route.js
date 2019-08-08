const express = require('express');
const router = express.Router();
const books = require('../models/books');

router.post('/addbooks', (req,res,next) => {
    const addbook = new books({
        book_id: req.body.book_id,
        book_name: req.body.book_name,
        author_name: req.body.author_name,
        book_cat: req.body.book_cat,
        quantity: req.body.quantity
    });

    addbook.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Book Created successfully')
    })
})

router.get('/getbook',(req,res,next) =>{

    books.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.put('/updateBook/:id', (req,res,next) =>{
    books.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        console.log(req.body);
        if (err) return next(err);
        res.send('Book udpated.');
    });
})


router.delete('/deleteBook/:id',(req,res,next) => {
    books.findByIdAndRemove({_id:req.params.id}, function (err) {
        console.log("1",req.params);
        if (err) return next(err);
        res.send("Deleted Successfully!!");
    })
})  

module.exports = router;
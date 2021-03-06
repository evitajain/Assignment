// //models >> books.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Books Schema
let BooksSchema = new Schema({
    book_id:{
        type: String,
        required: true
    },
    book_name: {
        type: String,
        required: true, 
        max: 100
    },
    author_name:{
        type: String, 
        required: true
    },
    book_cat:{
        type: String, 
        required: true
    },
    quantity:{
        type: String, 
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
});


// // Export the model
module.exports = mongoose.model('books', BooksSchema);
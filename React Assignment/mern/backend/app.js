const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const config = require('./db');
const users = require('./routes/user'); 

const db = require("./db").mongoURI;
mongoose.connect(db,
     { useNewUrlParser: true })
     .then(
            () => {console.log('Database is connected') },
            // err => { console.log('Can not connect to the database'+ err)}
    )
    .catch(err => console.log(err));



const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use('/api/users', users);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
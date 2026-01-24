const mongoose = require('mongoose');


function connectDB() {

    mongoose.connect('mongodb://localhost:27017/moodyPlayer')
    .then(() => {
        console.log('Connected to MongoDB');
    });
    
}

module.exports = connectDB;
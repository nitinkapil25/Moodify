const express = require('express');
const songroutes = require('./routes/song.routes'); 
const cors = require('cors');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());


app.use('/', songroutes);




module.exports = app;
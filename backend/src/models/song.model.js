const mongoose = require('mongoose');



//schema creation
const songSchema = new mongoose.Schema( {
    title:String,
    artist:String,
    audio:String,
    mood:String,
})
 

///model creation
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
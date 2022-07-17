//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection(to check if it is successful)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    
    console.log('Successfully connected to database');

});
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
});

//Collection which will be using this schema
const Contact = mongoose.model('Contact', contactSchema);

//Time to export it
module.exports = Contact;
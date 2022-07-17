const express = require('express');
const path = require('path');
const port = 7000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express(); //Now this app variable has functionality to all express libraries which are needed to run a server

app.set('view engine','ejs'); //What it will do basically,app has multiple properties,so it added one more property with name view engine and value ejs
app.set('views', path.join(__dirname,'views')); //Basically we have created a new path to view the files

app.use(express.urlencoded()); 

app.use(express.static('assets'));

/* Array of Contacts */
var contactList = [     
     {
        name : "Devesh",
        phone : "1111111111"
     },
     {
        name : "Sanjay",
        phone : "2222222222"
     },
     {
        name : "Mohit",
        phone : "3333333333"
     }
]

app.get('/',function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', { 
            title : "Contacts List",
            contact_list : contacts
    });
    });
});

app.post('/create-contact', function(req, res){

      Contact.create({
      name: req.body.name,
      phone: req.body.phone
    }, function(err, newContact){
      if(err){
        console.log('Error in creating a contact!');
        return;
      }

      console.log('********', newContact);
      return res.redirect('back');
    });
});

/* For deleting a contact */
app.get('/delete-contact',function(req,res){

    /* Get the id from the query in the url */
      let id = req.query.id;

    /* Find the contact in the database using id and delete */
        Contact.findByIdAndDelete(id, function(err){
        if(err){
          console.log('error in deleting an object in database');
          return;
         }  
         return res.redirect('back');
      });
});

app.listen(port,function(err){   //Created Express Server
    if(err){
        console.log('Error in running the server',err);

        console.log('Yup!My Express Server is running on Port:',port);
    }
})
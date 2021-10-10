const express = require('express');
const app = express();

// adding the  data base server Here
const db = require('./config/mongoose');
// here i am importing the schema created for this site.
const Contact = require('./models/contacts');

app.listen(8080,function(err){
    if(err) console.log("the server is not working");
    console.log("servier is runnig");
});

app.set("view engine","ejs");
app.set("path",__dirname+"/views");
app.use(express.static("assets"));


app.use(express.urlencoded());

contactList = [
    {
        name:"ghanshyam",
        contact:"8477001129"
    },
    {
        name:"arpan",
        contact:"4587552663"
    },
    {
        name:"this",
        contact:"1818475235"
    }
];

app.get('/',function(req,res){
    Contact.find(function(err,contactList){
        if(err){console.log("error during fetching the database")
        return;}
        context = {
            title:"contact list",
            contact_list:contactList,
        }
        return res.render('home',context);
    });
});

app.post('/create-contact',function(req,res){
    // here i am using the database to store the data
    Contact.create({
        name:req.body.name,
        contactNumber:req.body.contact
    }, function(err,newContact){
        if(err) {console.log('error in creatng a new contact')
    return;}
    console.log('++++++',newContact);
    
    return res.redirect('back');
    });
});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("roowr in deleteing an object");
            return;
        }
        return res.redirect('back');
    });
});

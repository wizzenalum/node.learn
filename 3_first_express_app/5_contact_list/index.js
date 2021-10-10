// creating the contact list
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;


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

app.set('view engine','ejs');
app.set('path',__dirname+"views")


app.listen(port,function(err){
    if(err) console.log("server dont woanna start");
    console.log("server is fine");
});

app.get('/',function(req,res){
    let context = {
        title:"context list",
        contact_list:contactList
    }
    return res.render('home',context);
});
// adding form to add data to the server
const express = require('express');
const path = require('path');

const app = express();

app.set('path',__dirname+'views');
app.set('view engine','ejs')

app.listen(8080,function(err){
    if(err) console.log("server failure");
    console.log("sever is up and running");
});

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

app.get("/",function(req,res){
    context = {
        contact_list:contactList,
    };
    res.render("home",context);
});

app.get("/nothing",function(req,res){
    return res.sendFile(__dirname+"/views/nothing.html")
})

app.post('/create-contact',function(req,res){
    console.log(req);
    // return
    return res.redirect('/nothing');
})
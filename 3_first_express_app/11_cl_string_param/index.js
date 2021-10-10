const express = require('express');
const app = express();

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
    context = {
        title:"contact list",
        contact_list:contactList,
    }
    return res.render('home',context);
});

app.post('/create-contact',function(req,res){
    contactList.push(req.body);
    return res.redirect('/');
});

// here i am using the req.params for recieving the data from the clint to take reaspectve action.
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params.phone);
//     return res.redirect('/');
// });

// here i am goin to use the query strings.
app.get('/delete-contact/',function(req,res){
    console.log(typeof req.query);
    let phone = req.query.phone;
    console.log(phone);
    let contactIndex = contactList.findIndex(contact => contact.contact==phone);
    if(contactIndex!=-1) contactList.splice(contactIndex,1);
    return res.redirect('/');
});


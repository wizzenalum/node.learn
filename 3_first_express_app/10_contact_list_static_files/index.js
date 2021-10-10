// adding static files to the system

const express = require("express");
const app = express();

app.listen(8080,function(err){
    if(err) console.log('server is not working');
    console.log("server up and running");
});

app.set('view engine','ejs');
app.set('path',__dirname+"views");

app.use(express.urlencoded({extended:true}));

// here we will creating path for static files
app.use(express.static('assets'));  // assets is the name of the folder

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

// app.get('/404',function(req,res){
//     return res.static('/404.html');
// });

app.get('/',function(req,res){
    context = {
        title:"contact list",
        contact_list:contactList,
    }
    return res.render('contacts',context)
});

app.post('/create-contact',function(req,res){
    contactList.push(req.body);
    return res.redirect('back');
});
app.post('/delete-contact',function(req,res){
    // contactList.push(req.body);
    contactList.splice(parseInt(req.body.del),1);
    return res.redirect('back');
});

//creating contact field by parsing it from tmiddle ware. 
const express = require('express');
const app = express();

app.listen(8080,function(err){
    if(err) console.log("server is failed");
    console.log("server is runnig and up");
});

app.set('path',__dirname+"views");
app.set('view engine','ejs');

// creating a middle ware which will parse the submited data
// app.use(urlencoded());  // this is depricated
app.use(express.urlencoded({ extended:false}));


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
    console.log(req.body, typeof(req.body));
    contactList.push(req.body);
    // return res.redirect('/');
    return res.redirect('back');// it will send this to back to the previous route.

});
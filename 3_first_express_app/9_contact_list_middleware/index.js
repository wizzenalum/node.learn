// basically how middle ware works.
const { urlencoded } = require('express');
const express = require('express');
const app = express();

app.listen(8080,function(err){
    if(err) console.log("server is failed");
    console.log("server is runnig and up");
});

app.set('path',__dirname+"views");
app.set('view engine','ejs');

app.use(express.urlencoded({ extended:false}));

// creaing middle ware.
app.use(function(req,res,next){ // 3 argument are default and next call for next middle ware or server at end.
    console.log("the middle  ware is called");
    req.myName = "ghanshyam"
    next();  // without calling this page only load because i did'nt 

});
// creaing middle ware.
app.use(function(req,res,next){ // 3 argument are default and next call for next middle ware or server at end.
    console.log("the middle 2  ware is called", req.myName);
    next();  // without calling this page only load because i did'nt 

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

app.get('/',function(req,res){
    context = {
        title:"contact list",
        contact_list:contactList,
    }
   return res.render('home',context);
});

app.post('/create-contact',function(req,res){
    console.log("the post request is called", req.myName);

    console.log(req.body, typeof(req.body));
    contactList.push(req.body);
    return res.redirect('back');

});
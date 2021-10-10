//deleteing the contact.

const { urlencoded } = require('express');
const express = require('express');
const app = express();

app.listen(8080,function(err){
    if(err) console.log("server is failed");
    console.log("server is runnig and up");
});

app.set('path',__dirname+"views");
app.set('view engine','ejs');

app.use(express.urlencoded({ extended:true}));


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
var del = function(i){
    contact_list.splice(i,0,1);
};
app.get('/',function(req,res){
    context = {
        title:"contact list",
        contact_list:contactList,
        del:del,
    }
   return res.render('contacts',context);
});

app.post('/create-contact',function(req,res){
    console.log(req.body, typeof(req.body));
    contactList.push(req.body);
    return res.redirect('back');
});

app.post('/delete-contact',function(req,res){
    console.log("data is deleted once", req.body);
    contactList.splice(parseInt(req.body.del),1)
    return res.redirect('back');
})
// console.log(document.querySelector("input"));
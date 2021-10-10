const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');
const env = require('./environment')
let transporter = nodemailer.createTransport(env.smtp);

  // i allowed my mailing mail to less sequire apps after then it is able to login

  let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    console.log("get in to render templates")
    ejs.renderFile(
      path.join(__dirname,'../views/mailer',relativePath),
      data,
      function(err,template){
        if(err){console.log('error in rendring',err);return}
        console.log("mail template is created", template)
        mailHTML = template
      }
    )
    return mailHTML;
  }
  module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
  }

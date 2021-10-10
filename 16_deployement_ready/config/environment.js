const fs = require("fs");
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});


const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'QjbOI4KLUSHGuKRfg4TPoGsByf9Vxkn7',
    db: "27017/test",
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ektajain986@gmail.com',
            pass: '175*Shyam',
        }
    },
    google_clientID: "420707476913-5oindgp5dqkf3sr6p319abgp1oj6pj4a.apps.googleusercontent.com",
    google_clientSecret: "CHyPZtyeTG-N4KI4mudz_-Fp",
    google_callbackURL: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: '24Q9Zj93mVVyykqNNj3O2GOJttOVKPy',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}


const production = {
    name: 'production',
    asset_path: process.env.WIXY_ASSET_PATH,
    session_cookie_key: process.env.WIXY_SESSION_COOKIE_KEY,
    db: "27017/wixy_production",
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.WIXY_GMAIL_USERNAME,
            pass: process.env.WIXY_GMAIL_PASSWORD,
        }
    },
    google_clientID: process.env.WIXY_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.WIXY_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.WIXY_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.WIXY_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

const environment = eval(process.env.WIXY_ENVIRONMENT)==undefined?development:eval(process.env.WIXY_ENVIRONMENT);
console.log("ENVIRONMENT IS ---",environment.name)
module.exports = environment;
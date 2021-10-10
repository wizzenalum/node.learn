// every js file work like common js module where each variable and functions of that file are isolated.
// but in browser we need to use iifi for isolation.
//*********************       common js module *************** */
// common js modules used in node generally if it apear in browser that means it is emmulatint the require function.

// // if module contain only one export .
// const fullName = require('./singleFunction');
// console.log("1. single export from single file ",fullName("ghanshyam","abby"));

// // multiple exports from on module
// const love = require('./MultiExportWay1');
// console.log("2. multi exports from single module ",love.abby("ghanshyam"), love.moreAbby("ghanshyam"));

// // multiple exports from on module way 2.
// const lovie = require('./MultiExportWay2');
// console.log("2. multi exports from single module ",lovie.abby("ghanshyam"), lovie.moreAbby("ghanshyam"));

// // we can call require inside the loop function and conditionals
// if(1==1){
//     const lovie = require('./MultiExportWay2');
//     console.log("3. require in conditionals if ",lovie.abby("ghanshyam"), lovie.moreAbby("ghanshyam"));
// }

// // we can structure the require.
// const {abby,moreAbby} = require("./MultiExportWay2");
// console.log("4. structuring the import ",abby("ghanshyam"), moreAbby("ghanshyam"));

//**********        es6 modules        ************** */
//used in browser side module....  so use html file.
// use of this will be in responsivewebden.learing chapter 7.

import fullname from "./es6singleFunction.js";
console.log("es6  ", fullname("abby", "loves me"));



// const operation = require("./operation.js")
// console.log(operation.add(4,5));
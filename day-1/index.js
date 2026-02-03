/*
To run Java Script outside the browser
 Syntax:-  node <filename>

*/

// console.log("Hello World!!....");

// for(let i=0; i<10; i++){
//     console.log("Hello!");
// }

/*

What are packages!
-> Packages wo code hota hai jo hamne nahi likha 
kisi or develor ne likha lakin publicly available kar
diya taki koi aur developer access kar sake.

Sare code this (NpmJs.com) website pe availabel hai.

To use package in our code we have to install it 
Syntax : npm i <package name> or npm install <package name>


*/


const catMe = require('cat-me'); // cat-Me Package

setInterval(()=>{
    console.log(catMe());
}, 2000)


/*
1). package.json
Package.josn file ka ak meain role hota hai hamara java script ka code
hai wo pura code kis kis package per depand karta hai usko list karta hai

2). node_modules
->node modules packages ka sare code ko store kara hai. 

3). package-lock.json
-> package-lock.json hamara code kis package pe depend karta hai aur
wo further package kis kis package pe depend karta hai usko list karta
hai


Server
->Server ak machine hai jiska khud ak ak operating system, process, ram 
nd storage hota hai
Server ak machine hoti hai jisko is tarah se programmed kiya gaya hai
ki user  jo bhe request bheje ga uska ak proper response de sake

*/

/*

Q1). How to create a server in Express

Step1. npm init -y -> To initialize node js project
Step2. npm i express -> To install Express Package
Step3. 

*/

// const express = require("express");

// const app = express();  // Server is created with this line

// app.listen(3000) // app.listen() -> Server ko start karta hai

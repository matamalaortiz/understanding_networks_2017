"use strict";

// const teletype = require('teletype')
// const client = teletype('172.22.151.123', 8080)

var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

// var Gpio = require('onoff').Gpio,
//   LEFT_PIN = new Gpio(5, 'in', 'both'),
//   RIGHT_PIN = new Gpio(6, 'in', 'both'),
//   DOWN_PIN = new Gpio(13, 'in', 'both'),
//   UP_PIN = new Gpio(19, 'in', 'both'),
//   X_PIN = new Gpio(26, 'in', 'both');

firebase.initializeApp({
  serviceAccount: "./database-f9d104b00c9f.json",
  databaseURL: "https://neat-vista-141916.firebaseio.com/"
});

var ref = firebase.database().ref('state');

// let msg_from_server = /(minimum 2 players)/
//
// client.readUntil(msg_from_server).then(response=>{
//   console.log("connected");
//
//   LEFT_PIN.watch(function (err, value) {
//     if (err) {
//       throw err;
//     }
//     if(!value){
//       client.exec('l\n');
//       console.log("LEFT");
//     }
//   });
//
//   RIGHT_PIN.watch(function (err, value) {
//     if (err) {
//       throw err;
//     }
//     if(!value){
//       client.exec('r\n');
//       console.log("RIGHT");
//     }
//   });
//
//   DOWN_PIN.watch(function (err, value) {
//     if (err) {
//       throw err;
//     }
//     if(!value){
//       client.exec('d\n');
//       console.log("DOWN");
//     }
//   });
//
//   UP_PIN.watch(function (err, value) {
//     if (err) {
//       throw err;
//     }
//     if(!value){
//       client.exec('u\n');
//       console.log("UP");
//     }
//   });
//
//   X_PIN.watch(function (err, value) {
//     if (err) {
//       throw err;
//     }
//     if(!value){
//       client.exec('x\n');
//       console.log("CLOSE");
//     }
//   });
//
// });
//
//
// process.on('SIGINT', function () {
//   client.exec('x\n')
//   button.unexport();
// });


//Multiple users helping 1 user

ref.on('value', function(snapshot) {
var value = snapshot.val();
  if (value.left === 1) {
    // client.exec('l\n');
    console.log('LEFT');
  }
  if (value.right === 1) {
    // client.exec('r\n');
    console.log('RIGHT');
  }
  if (value.up === 1) {
    // client.exec('u\n');
    console.log('UP');
  }
  if (value.down === 1) {
    // client.exec('d\n');
    console.log('DOWN');
  }
});

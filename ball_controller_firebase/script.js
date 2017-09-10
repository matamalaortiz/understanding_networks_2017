// Initialize Firebase
var config = {
 apiKey: "AIzaSyCVas_rM__4iheoLU1grsEfpc8zDx-XS8Q",
 authDomain: "neat-vista-141916.firebaseapp.com",
 databaseURL: "https://neat-vista-141916.firebaseio.com",
 projectId: "neat-vista-141916",
 storageBucket: "neat-vista-141916.appspot.com",
 messagingSenderId: "155843876516"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('state');

var left = document.getElementById("left");
var right = document.getElementById("right");
var down = document.getElementById("up");
var up = document.getElementById("down");
var down = false;


// Move Left
function leftDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({left: 1},0);
    console.log("Left Pressed");
  }
  e.preventDefault();
  return false;
}

function leftUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({left: 0},0);
    console.log("Left UnPressed");
  }
}

// Move Right
function rightDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({right: 1},0);
    console.log("Right Pressed");
  }
  e.preventDefault();
  return false;
}

function rightUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({right: 0},0);
    console.log("Right UnPressed");
  }
}

// Move Up
function upDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({up: 1},0);
    console.log("Up Pressed");
  }
  e.preventDefault();
  return false;
}

function upUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({up: 0},0);
    console.log("Up UnPressed");
  }
}

// Move Down
function downDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({down: 1},0);
    console.log("Up Pressed");
  }
  e.preventDefault();
  return false;
}

function downUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({down: 0},0);
    console.log("Down UnPressed");
  }
}

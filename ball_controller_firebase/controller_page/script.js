var ref = firebase.database().ref('state');

var left = document.getElementById("left");
var right = document.getElementById("right");
var down = document.getElementById("up");
var up = document.getElementById("down");
var down = false;


// jQuery no-double-tap-zoom plugin

// Triple-licensed: Public Domain, MIT and WTFPL license - share and enjoy!

(function($) {
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);

// Move Left
function leftDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({left: 1},0);
    console.log("Left Pressed");
  }
  // e.preventDefault();
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
  // e.preventDefault();
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
  // e.preventDefault();
  return false;
}

function upUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({up: 0},0);
    console.log("Up UnPressed");
  }
}

// Move Up
function downDown(e) {
  down = true;
  if (down === true){
    ref.setWithPriority({down: 1},0);
    console.log("Up Pressed");
  }
  // e.preventDefault();
  return false;
}

function downUp() {
down = false;
  if (down === false ){
    ref.setWithPriority({down: 0},0);
    console.log("Down UnPressed");
  }
}

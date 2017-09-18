#!/usr/bin/env node

const Traceroute = require('nodejs-traceroute');
var search = require('youtube-search');
var iplocation = require('iplocation')
const { exec } = require('child_process');
var currentCity, pastCity, youTubeSearch;
var cities = [];
const youtubeKey = "AIzaSyDvMKiS9p_x2lvsLC9-0_iV9Iwi4qQAb0I";
var clc = require('cli-color');
var videos = [];
var fs = require("fs");


var argv2 = process.argv[2];

var color = clc.xterm(125).bgXterm(255);
var color1 = clc.xterm(236).bgXterm(202);
var color2 = clc.xterm(0).bgXterm(125);

var opts = {
  maxResults: 1,
  key: youtubeKey
};


try {
    const tracer = new Traceroute();
    tracer
        .on('pid', (pid) => {
            // console.log(`pid: ${pid}`);
            console.log(color1("TRACING : ") + (color(" " + argv2 + " ")));
        })
        .on('destination', (destination) => {
            console.log(`destination: ${destination}`);
        })
        .on('hop', (hop) => {
            // console.log(`${JSON.stringify(hop.ip)}`);
            iplocation(hop.ip)
              .then(data => {

                // console.log(data.zip_code);
                currentCity = data.region_name;

                if (!cities.includes(currentCity) && currentCity != "") {
                  cities.push(currentCity);

                    console.log(color1("📌  The connection is now in ") + (color(" " + currentCity + " ")));
                    youTubeSearch = currentCity + " song";

                  search(youTubeSearch, opts, function(err, results) {
                    // if(err) return console.log(err);

                    if (!videos.includes(results[0].link)  ) {
                      videos.push(results[0].link);
                    }

                    console.log(color1("🎼  Most Popular Song Found: ") + (color(" " + results[0].title  + " ")));

                    var yt = "mpv --start=10 --end=35 " + results[0].link ;


                    // exec(yt, (error, stdout, stderr) => {
                    //     if (error) {
                    //       console.error(`exec error: ${error}`);
                    //       return;
                    //     }
                    //     // console.log(`stdout: ${stdout}`);
                    //     // console.log(`stderr: ${stderr}`);
                    //   });

                  });
                }

              })
        })

        .on('close', (code) => {
            // console.log(`close: code ${code}`);
            writeAndPlay();
            console.log(color("closing connection and playing playlist"));
        });

    tracer.trace(argv2);
} catch (ex) {
    console.log(ex);
}

process.on('SIGINT', function() {
  // console.log('Closing');
  // writeAndPlay();

});


function writeAndPlay(){
  setTimeout(function(){
    var videosLinks = videos.join('\n');

    fs.writeFile( "videosLinks.txt",videosLinks, "utf8" );
    var yt = "mpv --start=10 --end=35 --playlist videosLinks.txt";

    exec(yt, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        console.log(color1("Traceroute finished"));
      });
   }, 3000);
}

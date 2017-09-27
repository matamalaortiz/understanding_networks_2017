const Traceroute = require('nodejs-traceroute');
const { exec } = require('child_process');
const keys = require('./keys.js');
var search = require('youtube-search');
var iplocation = require('iplocation')
var clc = require('cli-color');
var fs = require("fs");
var youtubeKey = keys.youtube.api_key;

var cities = [];
var videos = [];
var argv2 = process.argv[2];
var opts = {
  maxResults: 1,
  key: youtubeKey
};

var currentCity, pastCity, youTubeSearch;
var color = clc.xterm(125).bgXterm(255);
var color1 = clc.xterm(236).bgXterm(202);
var color2 = clc.xterm(0).bgXterm(125);


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

              });
            }

          })
      })

      .on('close', (code) => {
        // console.log(`close: code ${code}`);
        writeAndPlay();
        console.log(color(" Closing connection • • Create Playlist  "));
      });

      tracer.trace(argv2);

} catch (ex) {
    console.log(ex);
}

process.on('SIGINT', function() {});

function writeAndPlay(){
  setTimeout(function(){
    var videosLinks = videos.join('\n');
    fs.writeFile( "videosLinks.txt",videosLinks, "utf8" );

    var yt = "mpv --start=15 --end=30 --playlist videosLinks.txt";

    exec(yt, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        console.log("//////////////////////////////////////////////////////////// \n" +
        color(" xxx Traceroute finished xxx ") + " \n///////////////////////////////////////////////////////////");
      });
   }, 3000);
}

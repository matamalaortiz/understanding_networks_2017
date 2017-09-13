const Traceroute = require('nodejs-traceroute');
var search = require('youtube-search');
var iplocation = require('iplocation')
const { exec } = require('child_process');
var currentCity, pastCity, youTubeSearch;
var cities = [];
const youtubeKey = "AIzaSyDvMKiS9p_x2lvsLC9-0_iV9Iwi4qQAb0I";


var opts = {
  maxResults: 1,
  key: youtubeKey
};


try {
    const tracer = new Traceroute();
    tracer
        .on('pid', (pid) => {
            console.log(`pid: ${pid}`);
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
                console.log(currentCity);

                if( !cities.includes(currentCity) && currentCity != ""){
                  cities.push(currentCity);
                  // console.log(currentCity);
                  youTubeSearch = currentCity + " song";

                  search(youTubeSearch, opts, function(err, results) {
                    if(err) return console.log(err);

                    var yt = "ytdl " + results[0].link + " | mpv -";
                    // console.dir(results);
                    exec(yt, (error, stdout, stderr) => {
                        if (error) {
                          console.error(`exec error: ${error}`);
                          return;
                        }
                        // console.log(`stdout: ${stdout}`);
                        // console.log(`stderr: ${stderr}`);
                      });
                  });
                }


              })
        })
        .on('close', (code) => {
            console.log(`close: code ${code}`);
        });

    tracer.trace('github.com');
} catch (ex) {
    console.log(ex);
}

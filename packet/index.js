var clc = require('cli-color');
var fs = require('fs');
const exec = require('child_process').exec;
const keys = require('./keys.js');
let data = ''

fs.readFile( 'is.txt','utf8', function ( err, data ) {
  if ( err ) throw err;
  console.log(clc.green("You haven't submitted any new unsecure POST request to any of the websites you're hosting"));
  if (data.includes("application/x-www-form-urlencoded")){
    console.log(clc.red(`
Warning - What have you just done?! ***************************`
    ));

    let content = "'Content-Type: application/json' -d " + "'{" + '"value1"' + ":" + '"' + "you have not add https to your websites yet" + '"' + "}' ";
    let key = keys.ifttt.api_key;
    let url = "https://maker.ifttt.com/trigger/call/with/key/" + key;
    let requestWebHook = "curl -X POST -H " + content + url;

    exec(requestWebHook, {}, function(error) {
      console.log(clc.yellow(`
I'm Calling You +++++++++++++++++++++++++++++++++++++++++++++++`
      ));

      if (error !== null) {
       console.log('exec error: ' + error);
      }
    });

  }
});

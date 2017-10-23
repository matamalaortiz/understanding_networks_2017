#!/bin/bash
echo "Hello $USER."

post_http() {
  echo "Sniffing your traffic @ host 205.186.187.183 && port 80 "
  tshark -i en0 -f 'host 205.186.187.183 && port 80' -Y 'http.request.method == POST' -a duration:10 > is.txt
  echo "Checking Packets"
  node_script
  sleep 3
  post_http
}

node_script(){
  node ./index.js
}

post_http

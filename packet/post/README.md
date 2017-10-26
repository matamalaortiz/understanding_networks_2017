## Wifi traffic analysis and my computer calling me to warn and remind me that I should add a SSL certificate.  

During the class Understanding Networks at ITP, New York University, we covered how to analyze packets over our network traffic. Some of the tools we went through were [Wireshark](https://www.wireshark.org/) and [Herbivore](https://github.com/samatt/herbivore/releases). Although I ended up using Tshark, which is basically Wireshark for the command line.

I started analyzing using the default command `$ tshark`, but realized the output was too overwhelming to understand what was going on or to notice a specific pattern.


Exploring `tshark` a little more I found out it provides different flags to reduce or filter a number of packages you want to analyze. To begin I wanted to capture regular network data over wireless traffic so I chose the interface `-i en0` which looks for Ethernet or AirPort(wifi) interfaces on a MacOS X. It still produced too many outputs so I included the filter `-f port 80` to see which packets would I get visiting websites without HTTPS.

I use a virtual shared hosting to host my personal website and a few others I've made for projects or clients. Currently, it host around 10 websites and none of them have SSL certificates. As all my websites are hosted in the same share hosting all of them are pointing to the same IP address. I started analyzing them and very quickly realized how easy it was to get my passwords in the packets when I log in to the admin panels. So I thought it is time to add HTTPS to all of them, but unfortunately, I don't have much time for it right now.

So, I decided to make a small script that is permanently sniffing my own traffic and every time I submit a POST request to login into the admin panels of any of the websites I'm hosting, my computer decides to call me using IFTTT services and reminds me that it is time to add an SSL certificate to the website I just logged in to.

**How does it call me?**

The bash script is using the following command.
`tshark -i en0 -f 'host 205.186.187.183 && port 80' -Y 'http.request.method == POST' -a duration:10 > is.txt`

Which is scanning into my packets and every time it hits the IP address of my shared hosting and found a POST request on port 80 it saves it to a `.txt` file. After that, it runs a Nodejs script which watches the `.txt` file and if it founds something it fires a webhook (or a POST request) to IFTTT, who handle the call event.

[Check the Video here or click on the image below => You Tube](https://www.youtube.com/watch?v=Y-12mJWEUP0&feature=youtu.be)

[![You Tube video here ](../img.png)](https://www.youtube.com/watch?v=Y-12mJWEUP0&feature=youtu.be)

[See the code here](https://github.com/matamalaortiz/understanding_networks_2017/tree/master/packet)

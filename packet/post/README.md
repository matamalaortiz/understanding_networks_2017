During the class Understanding Networks at ITP, New York University, we covered how to analyze packets over our network traffic. Some of the tools we went through were [Wireshark](https://www.wireshark.org/) and [Herbivore](https://github.com/samatt/herbivore/releases. Although, I ended up using Tshark, which is basically Wireshark for the command line.

I started analyzing using the default command `$ tshark`, and realized the output it gave me was way too much to understand what was going on or to pay attention to a specific pattern.

![](../img.png)

Exploring `tshark` a little more I found out it provides different flags to reduce or filter a number of packages you want to analyze. To begin I wanted to capture regular network data over wireless traffic so I choose the interface `-i en0` which looks for Ethernet or AirPort(wifi) interfaces on a MacOS X. It was still too many outputs so I included the filter `-f port 80` to see what packets would I get visiting websites without HTTPS.

I have a virtual shared hosting where I host my personal website and some few other I've made for projects or clients. Currently, I host around 10 websites and none of them have SSL certificates. As all my websites are hosted in the same share hosting all of them are pointing to the same IP address. I started analyzing them and very quickly realized how easy was to get my passwords when I wanted to log in to the admin panels. So I thought it is time to add HTTPS to all of them, but unfortunately, I don't have much time for it right now.

So, I decided to make a small script that is permanently sniffing my own traffic and every time I submit a POST request to login into the admin panels of any of the websites I am hosting, my computer decides to call me and remind me that is time to add an SSL certificate to the website I just log in to.

**How does it call me?**

The bach script is using the following command.
`tshark -i en0 -f 'host 205.186.187.183 && port 80' -Y 'http.request.method == POST' -a duration:10 > is.txt`

Which is scanning into my packets and every time it hits the IP address of my shared hosting on port 80 and found a POST request it save it to a `.txt` file. After that, it runs a Nodejs script which watches the `.txt` file and if it founds something it fires a webhook (or a POST request) to IFTTT, who handle the call event.


[![You Tube video here](../img.png)](https://www.youtube.com/watch?v=Y-12mJWEUP0&feature=youtu.be)

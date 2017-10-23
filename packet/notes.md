During the class Understanding Networks at ITP, New York University, we covered how to analyze packets of our network traffic. Some of the tools we went through were (link:https://www.wireshark.org/ text: Wireshark) and (link:https://github.com/samatt/herbivore/releases text: Herbivore). Although, I ended up using Tshark, which is basically Wireshark for the command line. 

I started analyzing using the default command `$tshark`, and I quickly realized the output it gave me was way too much to understand or pay attention to common patterns.

(image: tshark.png  width: 100% )

Exploring `tshark` a little more I found out that provides different flags to reduce or filter the amount of data you want to analyze. To begin I wanted to capture regular network data over wireless traffic so I choose the interface `-i en0` which stands for  Ethernet or AirPort interfaces on a MacOS X.

(youtube: https://www.youtube.com/watch?v=Y-12mJWEUP0&feature=youtu.be width: 100%)

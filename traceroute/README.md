# Traceroute video music

A Nodejs tool to traceroute a website that returns the most popular video song from the location were the connection hop.

![](./demo.gif)


## Requirements

- [MVM](https://mpv.io/installation/)
- Youtube Api Key

## Installation

• Create a ./keys.js file and include:

```ts
module.exports = {
	youtube: {
	api_key: 'XXXXXXXX YOUR API KEY XXXXXXXXXXXXX',
	}
};
```
• Run:

```bash
npm install

npm run trace url

```

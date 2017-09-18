# Traceroute video music

A Nodejs tool to traceroute a website that returns the most popular videos from the city were the connection hop.

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
run:
```bash
npm install

npm run trace url 

```

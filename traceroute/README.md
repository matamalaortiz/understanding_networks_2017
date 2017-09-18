# Traceroute video music

A Nodejs tool to traceroute a website that returns the most popular videos from the city were the connection hop.

## Requirements

- [MVM](https://mpv.io/installation/)
- Youtube Api Key

## Run

```bash
npm install

```
### Create a keys.js fail and include this:

```ts
module.exports = {
	youtube: {
	api_key: 'XXXXXXXX YOUR API KEY XXXXXXXXXXXXX',
	}
};
```

```bash
node index.js url
```

# @dvpnt/webpack-chunks-stats-plugin
[![Build Status](https://travis-ci.org/dvpnt/webpack-chunks-stats-plugin.svg?branch=master)](https://travis-ci.org/dvpnt/webpack-chunks-stats-plugin)
[![NPM Version](https://img.shields.io/npm/v/@dvpnt/webpack-chunks-stats-plugin.svg)](https://www.npmjs.com/package/@dvpnt/webpack-chunks-stats-plugin)


This plugin save transformed webpack [`stats.chunks`](https://webpack.js.org/configuration/stats/#statschunks) object as a json file.

## Installation

```sh
$ npm install --save-dev @dvpnt/webpack-chunks-stats-plugin
# or
$ yarn add --dev @dvpnt/webpack-chunks-stats-plugin
```

## Example

```js
const ChunksStatsPlugin = require('@dvpnt/webpack-chunks-stats-plugin');

module.exports = {
	plugins: [
		new ChunksStatsPlugin({
			filename: 'stats.json'
		})
	]
};
```

## License

[The MIT License (MIT)](/LICENSE)

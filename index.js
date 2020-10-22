const webpack = require('webpack');
// webpack v4/v5 compatibility:
// https://github.com/webpack/webpack/issues/11425#issuecomment-686607633
const {RawSource} = webpack.sources || require('webpack-sources');

class ChunksStatsPlugin {
	constructor(options = {}) {
		this.filename = options.filename || 'stats.json';
	}

	apply(compiler) {
		// webpack v4/v5 compatibility:
		// https://github.com/webpack/webpack/issues/11425#issuecomment-690387207
		if (webpack.version.startsWith('4.')) {
			compiler.hooks.emit.tap(
				this.constructor.name,
				(compilation) => this.handleCompilation(compilation)
			);
		} else {
			// Specifically hook into thisCompilation, as per
			// https://github.com/webpack/webpack/issues/11425#issuecomment-690547848
			compiler.hooks.thisCompilation.tap(
				this.constructor.name,
				(compilation) => {
					compilation.hooks.processAssets.tap(
						// See https://github.com/webpack/webpack/blob/9230acbf1a39a8afb2e34f41e2fd7326eef84968/lib/Compilation.js#L3376-L3381
						{
							name: this.constructor.name,
							stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
						},
						() => this.handleCompilation(compilation)
					);
				}
			);
		}
	}

	handleCompilation(compilation) {
		const stats = compilation.getStats().toJson({chunks: true});
		const mappedStats = {};

		stats.chunks.forEach(({names, hash}) => {
			mappedStats[names[0]] = {hash};
		});

		const statsStr = JSON.stringify(mappedStats, null, 2);

		compilation.emitAsset(this.filename, new RawSource(statsStr));
	}
}

module.exports = ChunksStatsPlugin;

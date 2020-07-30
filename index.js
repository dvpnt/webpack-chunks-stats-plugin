class ChunksStatsPlugin {
	constructor(options = {}) {
		this.filename = options.filename || 'stats.json';
	}

	apply(compiler) {
		compiler.hooks.emit.tap('ChunksStatsPlugin', (compiler) => {
			const stats = compiler.getStats().toJson({chunks: true});
			const mappedStats = {};

			stats.chunks.forEach(({names, hash}) => {
				mappedStats[names[0]] = {hash};
			});

			const statsStr = JSON.stringify(mappedStats, null, 2);

			compiler.assets[this.filename] = {
				source: () => statsStr,
				size: () => statsStr.length
			};
		});
	}
}

module.exports = ChunksStatsPlugin;

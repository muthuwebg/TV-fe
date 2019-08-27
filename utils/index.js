const manifest = require("../public/bundle/manifest.json");

exports.assetPath = path => {
	return manifest[path] ? manifest[path] : path;
};
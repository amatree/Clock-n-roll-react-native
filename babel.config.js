module.exports = function (api) {
	api.cache(true);
	return {
	  presets: 
			['babel-preset-expo', 
			"module:metro-react-native-babel-preset"], 
	  plugins: 
			['react-native-reanimated/plugin',
			"react-native-classname-to-style",
				[
					"react-native-platform-specific-extensions",
					{
						"extensions": ["css"]
					}
				]
			]
	};
};
module.exports = {
	parser: "@babel/eslint-parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			babelrc: false,
			configFile: false,
			// your babel options
			presets: ["@babel/preset-env"],
		},
	},
};

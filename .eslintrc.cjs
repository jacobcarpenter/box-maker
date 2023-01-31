/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',

		// keep prettier last; https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
		'prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: ['react'],
	rules: {
		'react/no-unknown-property': ['error', { ignore: ['sx'] }],
		'react/prop-types': ['error', { skipUndeclared: true }],
	},
};

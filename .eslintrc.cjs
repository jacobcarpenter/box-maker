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
		// TODO: should not be required after the fix for https://github.com/jsx-eslint/eslint-plugin-react/issues/3523 is released
		ecmaFeatures: {
			jsx: true,
		},
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
		'react/prop-types': ['error', { skipUndeclared: true }],
	},
};

module.exports = {
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'max-len': [2, 100],
		'@typescript-eslint/no-unused-vars': 2,
		'linebreak-style': ['error', 'windows'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab'],
		'import/prefer-default-export': 'off',
	},
	ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/'],
};

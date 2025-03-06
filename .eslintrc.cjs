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
		// 'max-len': [2, 100],
		'@typescript-eslint/no-unused-vars': 2,
		'linebreak-style': ['error', 'windows'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab'],
		'import/prefer-default-export': 'off',
		'class-methods-use-this': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{ ts: 'never', tsx: 'never' },
		],
		'no-param-reassign': ['error', { props: false }],
		// 'object-curly-newline': ['error', { multiline: true, minProperties: 3 }],
	},
	ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/'],
	settings: {
		'import/resolver': {
			alias: {
				map: [['@', './src']],
				extensions: ['.js', '.ts', '.tsx'],
			},
		},
	},
};

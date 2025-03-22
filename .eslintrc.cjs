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
		'@typescript-eslint/no-unused-vars': 2,
		'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
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
		'max-classes-per-file': 'off',
		// 'object-curly-newline': ['error', { multiline: true, minProperties: 3 }],
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'func-names': 'off',
		'no-constructor-return': 'off',
		'no-continue': 'off',
		'no-restricted-syntax': 'off',
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

module.exports = {
	useTabs: true,
	tabWidth: 4,
	singleQuote: true,
	semi: true,
	bracketSpacing: true,
	trailingComma: 'all',
	endOfLine: 'lf',
	proseWrap: 'always',
	htmlWhitespaceSensitivity: 'ignore',
	overrides: [
		{
			files: ['*.css', '*.scss'],
			options: {
				singleQuote: false,
				colorCase: 'lower',
				quoteProps: 'consistent',
				useTabs: false,
				tabWidth: 2,
			},
		},
		{
			files: ['*.hbs', '*.html'],
			options: {
				singleQuote: false,
				bracketSpacing: true,
				parser: 'glimmer',
			},
		},
		{
			files: ['*.json'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};

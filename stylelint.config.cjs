module.exports = {
	defaultSeverity: 'warning',

	ignoreFiles: ['**/*.js', '**/*.md'],

	customSyntax: 'postcss-scss',

	extends: [
		'stylelint-config-standard',
	],
	rules: {
		'color-hex-case': 'lower',
		'color-named': null,
		'alpha-value-notation': 'number',

		// SASS на данный момент не умеет в современный синтаксис
		'color-function-notation': 'legacy',

		'number-leading-zero': 'never',

		// Правило для @import, @mixin и т.д.
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'function',
					'if',
					'each',
					'include',
					'mixin',
					'use',
				],
			},
		],

		// Пустая строка перед @import, @media

		//(Отключено) Запретить селекторам с более низкой специфичностью появляться после переопределения селекторов с более высокой специфичностью.
		'no-descending-specificity': [
			null,
			{
				ignore: ['selectors-within-list'],
			},
		],

		// Двойные кавычки у строк
		'string-quotes': 'double',

		'selector-list-comma-newline-after': 'always-multi-line',

		// Проверка названий селекторов по БЭМ
		// "selector-class-pattern" : "^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$",
		'selector-class-pattern': [
			'^[-_a-zA-Z0-9]+$',
			{
				resolveNestedSelectors: true,
			},
		],

		'selector-id-pattern': '^[-_a-zA-Z0-9]+$',

		'block-closing-brace-empty-line-before': 'never',

		'no-missing-end-of-source-newline': true,
		'media-query-no-invalid': null,
		'import-notation': 'string',

		// Текущие версии сборки sass-loader не позволяют использовать (width >= 10px) (10px <= width >= 20px) и т.д.
		'media-feature-range-notation': 'prefix',
	},
};

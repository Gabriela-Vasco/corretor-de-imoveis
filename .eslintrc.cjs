module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"@nuxtjs/eslint-config-typescript",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier", "vue"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		quotes: ["error", "double"],
		semi: ["error", "always"],
		camelcase: "off",
		"vue/multi-word-component-names": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/multiline-html-element-content-newline": "error",
		"prettier/prettier": [
			"error",
			{
				tabWidth: 1,
				useTabs: true,
				singleQuote: false,
				semi: true,
				printWidth: 80,
				jsxBracketSameLine: false,
			},
		],
	},
};

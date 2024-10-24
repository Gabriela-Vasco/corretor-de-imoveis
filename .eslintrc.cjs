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
		// indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"vue/multi-word-component-names": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/multiline-html-element-content-newline": "error",
		"prettier/prettier": [
			"error",
			{
				tabWidth: 1, // This can be kept as is
				useTabs: true, // Ensure you are using tabs
				singleQuote: false,
				semi: true,
				printWidth: 80,
				jsxBracketSameLine: false,
			},
		],
	},
};

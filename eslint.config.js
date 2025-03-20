import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
	{
		name: "app/files-to-lint",
		files: ["**/*.{js,mjs,jsx,vue}"],
	},

	{
		name: "app/files-to-ignore",
		ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
	},

	js.configs.recommended,
	...pluginVue.configs["flat/recommended"],

	{
		rules: {
			"vue/multi-word-component-names": "off",
			// использовать табы размером 2 пробела
			indent: ["error", "tab"],
			"no-tabs": "off",
			"vue/html-indent": ["error", "tab"],
			"vue/script-indent": ["error", "tab", { "baseIndent": 0 }],
		},
	},
];

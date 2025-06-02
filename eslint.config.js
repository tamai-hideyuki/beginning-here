import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import globals from 'globals'
import next from '@next/eslint-plugin-next'

export default [
    {
        ignores: ['**/*.css'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: globals.browser,
        },
        plugins: {
            react,
            next,
        },
        rules: {
            'react/display-name': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]

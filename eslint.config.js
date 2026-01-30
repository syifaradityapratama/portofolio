import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    // Base configuration
    js.configs.recommended,

    // TypeScript + React configuration
    {
        files: ['resources/js/**/*.{ts,tsx,js,jsx}'], // Added js/jsx just in case
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node, // Added node globals for process.env etc
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // TypeScript
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',

            // React
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-uses-vars': 'error',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // General
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Allowed info
            'no-unused-vars': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-undef': 'off', // TypeScript handles this usually, but enabling globals should fix it. Turning off to rely on TS.
        },
    },

    // Ignore patterns
    {
        ignores: [
            'node_modules/**',
            'vendor/**',
            'public/**',
            'storage/**',
            '*.config.js',
            '*.config.ts',
            '**/ziggy.js',
        ],
    },
];

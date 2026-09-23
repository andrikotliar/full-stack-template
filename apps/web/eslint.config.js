import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { createConfig } from '@template/eslint-config';

export default createConfig({
  extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'react-refresh/only-export-components': 'off',
  },
});

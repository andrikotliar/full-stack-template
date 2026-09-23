import { createConfig } from '@template/eslint-config';

export default createConfig({
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

const eslintConfig = [
  {
    ignores: [".next/*", "dist/*", "node_modules/*"],
  },
  firebaseRulesPlugin.configs['flat/recommended'],
];

export default eslintConfig;

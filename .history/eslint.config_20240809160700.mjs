import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ignores: ['.history/**/*', '.prettier*', '.eslint*', '.gitignore'],
  },
  { languageOptions: { globals: globals.node } },

]


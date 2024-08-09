import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

const ignores = ['.history/**/*', '.prettier*', '.eslint*', '.gitignore']

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores,
  },
  { languageOptions: { globals: globals.node } },
  { ...pluginJs.configs.recommended, ignores },
  { ...tseslint.configs.recommended, ignores },
]


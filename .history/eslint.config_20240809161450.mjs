import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

const ignores = ['.history/**/*', '.prettier*', '.eslint*', '.gitignore']

export default [
  // {
  //   files: ['**/*.{js,mjs,cjs,ts}'],
  // },
  { languageOptions: { globals: globals.node } },
  { files: ['**/*.{js,mjs,cjs}'], ...pluginJs.configs.recommended },
  ...tseslint.configs.recommended,
  { ignores },
]


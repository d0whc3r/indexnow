import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: globals.node } },
  { files: ['**/*.{js,mjs,cjs}'], ...pluginJs.configs.recommended },
  ...tseslint.configs.recommended,
  { ignores: ['.history/**/*', '.prettier*', '.eslint*', '.gitignore'] },
]

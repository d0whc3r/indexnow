export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => /^chore(release): set `package.json` to .+$/m.test(message)],
}

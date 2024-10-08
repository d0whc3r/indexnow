export default {
  branches: [
    'master',
    {
      name: 'beta',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: 'dist/*',
      },
    ],
    [
      '@semantic-release/changelog',
      { changelogFile: 'CHANGELOG.md', changelogTitle: '# Changelog' },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): set `package.json` to ${nextRelease.version} [skip ci]',
      },
    ],
  ],
}

import { Option, program } from 'commander'
import { postIndex } from './post-index'
import type { ProgramaProps } from './types'

program
  .name('IndexNow')
  .description('IndexNow CLI')
  .addOption(new Option('-u, --url <url>', 'Sitemap to index').makeOptionMandatory(true))
  .addOption(new Option('-k, --key <key>', 'API key').makeOptionMandatory(true))
  .addOption(
    new Option('-s, --search-engine <search-engine>', 'Search engine')
      .choices(['yandex', 'bing', 'indexnow', 'seznam.cz', 'naver', 'yep'])
      .default('indexnow'),
  )
  .parse(process.argv)

const options = program.opts<ProgramaProps>()

postIndex(options.url, options.key, options.searchEngine)

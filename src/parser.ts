import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

export async function extractUrls(sitemap: string, acc: string[] = []): Promise<string[]> {
  const { data } = await axios.get(sitemap)

  const parser = new XMLParser({
    ignoreAttributes: true,
  })
  const { urlset, sitemapindex } = parser.parse(data)

  if (urlset) {
    return [urlset.url].flat().map((url: { loc: string }) => url.loc)
  } else if (sitemapindex) {
    for (const sitemap of [sitemapindex.sitemap].flat()) {
      acc.push(...(await extractUrls(sitemap.loc, acc)))
    }

    return acc
  }

  return []
}
